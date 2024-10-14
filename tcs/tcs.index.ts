import { watch } from "fs";
import { readdir } from "node:fs/promises";

const pagesDir = "../src/client/pages";
const staticsDev = "../src/statics/dev/";
const staticsDist = "../src/statics/dist/";

const watcher = watch(staticsDev, async (event, filename) => {
  try {
    console.log(`Detected ${event} in ${filename}`);
    if (filename && filename.endsWith(".ts")) {
      await Bun.build({
        entrypoints: [`${staticsDev}${filename}`],
        outdir: `${staticsDist}`,
        minify: false,
        conditions: ["browser"],
      });
    }
  } catch (error) {
    console.log(error);
  }
});

const watchPages = watch(
  pagesDir,
  { recursive: true },
  async (event, filename) => {
    if (!filename || !filename.endsWith(".tsx")) {
      console.log("Not a .tsx file", filename);
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
    console.log(pages);

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
    console.log(`Detected ${event} in ${filename}`);
  }
);

process.on("SIGINT", () => {
  console.log("Closing watcher...");
  watcher.close();
  watchPages.close();
  process.exit(0);
});

console.log("Starting watcher...");
