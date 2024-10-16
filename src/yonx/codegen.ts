import { watch } from "fs";
import { readdir, unlink } from "node:fs/promises";

const pagesDir = "src/client/pages";
const staticsDev = "src/statics/dev";
const staticsDist = "src/statics/dist";

const watcher = watch(
  staticsDev,
  { recursive: true },
  async (event, filename) => {
    console.log(event, filename);
    try {
      const files = await readdir(staticsDev, {
        recursive: true,
        withFileTypes: true,
      });
      const tsFiles = files
        .filter((file) => file.name.endsWith(".ts"))
        .map((x) => `./${x.parentPath}/${x.name}`);
      if (filename && filename.endsWith(".ts")) {
        const res = await Bun.build({
          entrypoints: tsFiles,
          outdir: `./${staticsDist}/js`,
          minify: false,
          splitting: true,
          naming: "[dir]/[name]-[hash].[ext]",
          conditions: ["browser"],
        });

        let map = new Map<string, string>();

        tsFiles.forEach((tsFile) => {
          const cleanName = tsFile
            .replace(`./${staticsDev}/`, "")
            .replace(".ts", "");
          const output = res.outputs.find((output) => {
            return (
              output.kind === "entry-point" &&
              output.path.includes(`${cleanName}-${output.hash}.js`)
            );
          });
          if (!output) return;
          map.set(cleanName, `/static/js/${cleanName}-${output.hash}.js`);
        });

        const existingDistFiles = await readdir(staticsDist, {
          recursive: true,
          withFileTypes: true,
        });

        const hashes = res.outputs
          .map((x) => x.hash)
          .filter((x) => typeof x === "string");

        existingDistFiles
          .filter((file) => file.name.endsWith(".js"))
          .forEach((file) => {
            const containsKeyword = hashes.some((hash) =>
              file.name.includes(hash)
            );
            console.log(file.parentPath);
            if (!containsKeyword) {
              unlink(`./${file.parentPath}/${file.name}`);
            }
          });
        generateScriptsFile(map);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

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

const watchPages = watch(
  pagesDir,
  { recursive: true },
  async (event, filename) => {
    if (!filename || !filename.endsWith(".tsx")) {
      return;
    }
    const files = await readdir(pagesDir, {
      recursive: true,
      withFileTypes: true,
    });
    const pages = files
      .filter((file) => file.name.endsWith(".tsx"))
      .map((file) => {
        const path = file.parentPath.replace(pagesDir, "");
        const name = file.name.replace(".tsx", "");
        const importName = path.replace(/\//g, "") + name;
        return {
          name,
          path,
          importName,
        };
      });

    const rootContent = `
  import { HonoApp } from "@/HonoApp";
  ${pages
    .map((page) => {
      return `import ${page.importName} from ".${page.path}/${page.name}";`;
    })
    .join("\n")}
  const app = new HonoApp().app;



  ${pages
    .map((page) => {
      return `app.route("${page.path !== "" ? page.path : "/"}", ${
        page.importName
      });`;
    })
    .join("\n")}

  export default app;
  `;
    await Bun.write(`${pagesDir}/root.ts`, rootContent.replace(/^\s+/gm, ""));
  }
);

process.on("SIGINT", () => {
  console.log("Closing watcher...");
  watcher.close();
  watchPages.close();
  process.exit(0);
});

console.log("Starting watcher...");
