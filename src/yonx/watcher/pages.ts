import chokidar from "chokidar";
import { readdir } from "fs/promises";
import { debounce } from "../utils";
import yonxConfig from "yonx.config";

const pagesDir = yonxConfig.codegen.pages.pagesPath;

interface PageInfo {
  name: string;
  path: string;
  importName: string;
}

const processPages = async (fileName: string) => {
  try {
    if (!fileName.endsWith(".tsx")) return;

    const files = await readdir(pagesDir, {
      recursive: true,
      withFileTypes: true,
    });

    const pages: PageInfo[] = files
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
  .map((page) => `import ${page.importName} from ".${page.path}/${page.name}";`)
  .join("\n")}

const app = new HonoApp().app${
      yonxConfig.i18n.enabled ? '.basePath(":lang/")' : ""
    };
export const Pages = app${pages
      .map(
        (page) =>
          `.route("${page.path !== "" ? page.path : "/"}", ${page.importName})`
      )
      .join("\n")};


export default app;
`;

    await Bun.write(`${pagesDir}/root.ts`, rootContent.trim());
    console.log("root.ts has been updated");
  } catch (error) {
    console.error("Error processing pages:", error);
  }
};

const debouncedProcessPages = debounce(processPages, 300);

if (yonxConfig.codegen.pages.enabled) {
  const watcherPages = chokidar.watch(`${pagesDir}`, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    // ignoreInitial: true,
  });

  watcherPages
    .on("add", (path) => {
      console.log(`File ${path} has been added`);
      debouncedProcessPages(path);
    })
    .on("change", (path) => {
      console.log(`File ${path} has been changed`);
      debouncedProcessPages(path);
    })
    .on("unlink", (path) => {
      console.log(`File ${path} has been removed`);
      debouncedProcessPages(path);
    })
    .on("unlinkDir", (path) => debouncedProcessPages(path));
} else {
  console.log("Page codegen disabled");
}
