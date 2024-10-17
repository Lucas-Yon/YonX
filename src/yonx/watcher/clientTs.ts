import { readdir, unlink } from "node:fs/promises";
import chokidar from "chokidar";
import { debounce } from "../utils";

const staticsDev = "src/statics/dev";
const staticsDist = "src/statics/dist";

function generateScriptsFile(map: Map<string, string>) {
  map.forEach((value, key) => {
    console.log(key, value);
  });
  const fileContent = `
  import { createScriptManager } from "./yonx/script";
  const scriptManager = createScriptManager();
  export const ExistingScripts = {
   ${Array.from(map.entries())
     .map(([key, value]) => `\t"${key}": "${value}"`) // Each entry gets a single tab
     .join(",\n")}
  };
  export const { Script, Scripts } = scriptManager;
  `;
  Bun.write("./src/scripts.ts", fileContent);
}

const processFile = async (filename: string) => {
  try {
    const files = await readdir(staticsDev, {
      recursive: true,
      withFileTypes: true,
    });
    const tsFiles = files
      .filter((file) => file.name.endsWith(".ts"))
      .map((x) => `${x.parentPath}/${x.name}`);

    if (filename.endsWith(".ts")) {
      const res = await Bun.build({
        entrypoints: tsFiles,
        outdir: `${staticsDist}/js`,
        minify: false,
        splitting: true,
        naming: "[dir]/[name]-[hash].[ext]",
        conditions: ["browser"],
      });

      let map = new Map<string, string>();

      tsFiles.forEach((tsFile) => {
        const cleanName = tsFile
          .replace(`${staticsDev}/`, "")
          .replace(".ts", "");
        const output = res.outputs.find(
          (output) =>
            output.kind === "entry-point" &&
            output.path.includes(`${cleanName}-${output.hash}.js`)
        );
        if (output) {
          map.set(cleanName, `/static/js/${cleanName}-${output.hash}.js`);
        }
      });

      const existingDistFiles = await readdir(staticsDist, {
        recursive: true,
        withFileTypes: true,
      });

      const hashes = res.outputs
        .map((x) => x.hash)
        .filter((x): x is string => typeof x === "string");

      for (const file of existingDistFiles) {
        if (file.name.endsWith(".js")) {
          const containsKeyword = hashes.some((hash) =>
            file.name.includes(hash)
          );
          if (!containsKeyword) {
            await unlink(`${file.path}/${file.name}`);
          }
        }
      }

      await generateScriptsFile(map);
    }
  } catch (error) {
    console.error("Error processing file:", error);
  }
};

const debouncedProcessFile = debounce(processFile, 300);

const watcher = chokidar.watch(staticsDev, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  ignoreInitial: true,
});

watcher
  .on("add", (path) => debouncedProcessFile(path))
  .on("change", (path) => debouncedProcessFile(path))
  .on("unlink", (path) => console.log(`File ${path} has been removed`));

// Graceful shutdown
// process.on("SIGINT", () => {
//   watcher.close().then(() => {
//     console.log("File watcher closed");
//     process.exit(0);
//   });
// });
