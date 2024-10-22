import { readdir, unlink } from "node:fs/promises";
import chokidar from "chokidar";
import { debounce, getHash } from "../utils";
import yonxConfig from "yonx.config";

const staticsDev = yonxConfig.codegen.cssmodule.devPath;
const staticsDist = yonxConfig.codegen.cssmodule.distPath;

function generateStylesFile(map: Map<string, string>) {
  const fileContent = `
  import { createStyleManager } from "./yonx/style";

  const styleManager = createStyleManager();

  export const ExistingStyles = {
   ${Array.from(map.entries())
     .map(([key, value]) => `\t"${key}": "/static/css/${value}"`)
     .join(",\n")}
  };
  export const { Style, Styles } = styleManager;
  `;
  Bun.write("./src/styles.ts", fileContent);
}

async function generateFileChangedOrNot(path: string) {
  const fileUpdatedContent = await Bun.file(path).text();

  const hash = getHash(fileUpdatedContent);
  const name = path.replace(`${staticsDev}/`, "").replace(".css", "");

  const hashedName = `${name}-${hash}.css`;
  const output = `${staticsDist}/css/${hashedName}`;
  const file = Bun.file(output);
  return await file.exists();
}

const processFile = async (path: string) => {
  console.log(path);
  try {
    const check = await generateFileChangedOrNot(path);
    if (check) return;
    // check if file already exists

    const files = await readdir(staticsDev, {
      recursive: true,
      withFileTypes: true,
    });

    const cssFiles = files
      .filter((file) => file.name.endsWith(".css"))
      .map((x) => {
        return { path: `${x.parentPath}/${x.name}`, file: x.name };
      });

    const map = new Map<string, string>();

    for (const cssFile of cssFiles) {
      const file = Bun.file(cssFile.path);
      const text = await file.text();
      const hash = getHash(text);
      const name = cssFile.path
        .replace(`${staticsDev}/`, "")
        .replace(".css", "");
      const hashedName = `${name}-${hash}.css`;
      const output = `${staticsDist}/css/${hashedName}`;
      map.set(name, hashedName);

      await Bun.write(output, text);
    }

    const oldFiles = await readdir(`${staticsDist}/css`, {
      recursive: true,
      withFileTypes: true,
    });

    const newNames = Array.from(map.values()).join("  ");
    for (const oldFile of oldFiles) {
      if (oldFile.name.endsWith(".css")) {
        if (!newNames.includes(oldFile.name)) {
          await unlink(`${oldFile.parentPath}/${oldFile.name}`);
        }
      }
    }

    await generateStylesFile(map);
  } catch (error) {
    console.error("Error processing file:", error);
  }
};

const debouncedProcessFile = debounce(processFile, 300);

if (yonxConfig.codegen.cssmodule.enabled) {
  const watcher = chokidar.watch(staticsDev, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    // ignoreInitial: true,
  });

  watcher
    .on("add", (p) => debouncedProcessFile(p))
    .on("change", (p) => debouncedProcessFile(p))
    .on("unlink", (p) => debouncedProcessFile(p))
    .on("unlinkDir", (p) => debouncedProcessFile(p));
} else {
  console.log("Client CSS codegen disabled");
}
