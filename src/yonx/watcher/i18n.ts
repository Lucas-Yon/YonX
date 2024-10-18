import { readdir } from "node:fs/promises";
import chokidar from "chokidar";
import { debounce } from "../utils";
import yonxConfig from "yonx.config";
import { i18n } from "@/i18n/i18n.config";

const i18nPath = "src/i18n/";

function generateDictionaries(
  data: {
    path: string;
    file: string;
    lang: string;
  }[]
) {
  const uniqueLang = new Set<string>();

  // Iterate over each object in the array
  data.forEach((obj) => {
    if (obj.lang) {
      // Check if the "name" key exists
      uniqueLang.add(obj.lang);
    }
  });

  // Convert the Set to an array
  const languages = Array.from(uniqueLang);
  // check if all languages match the one in i18n.config

  const notMatching = languages.filter(
    //@ts-ignore
    (value) => !i18n.locales.includes(value)
  );

  if (notMatching.length > 0) {
    console.log(
      `Incorrect/Missing language in i18n.config for file : ${notMatching.join(
        ", "
      )}`
    );
    return;
  }

  const fileContent = `
export const dictionaries = {
  ${languages
    .map((lang) => {
      return `  ${lang}: {
    ${data
      .map((x) => {
        if (x.lang === lang) {
          return `    "${x.path}": () =>
      import("@/i18n/dictionaries/${x.path}/${x.file}").then(
        (module) => module.default
      ),`;
        }
      })
      .join("")}
  }`;
    })
    .join(",\n")}
};
`;

  console.log(fileContent);
  Bun.write("./src/yonx/dictionaries.ts", fileContent);
}

const processFile = async () => {
  try {
    const files = await readdir(i18nPath, {
      recursive: true,
      withFileTypes: true,
    });

    const jsonFiles = files
      .filter((file) => file.name.endsWith(".json"))
      .map((x) => {
        return {
          path: `${x.parentPath.replace(`${i18nPath}dictionaries/`, "")}`,
          file: x.name,
          lang: x.name.replace(".json", ""),
        };
      });
    await generateDictionaries(jsonFiles);
  } catch (error) {
    console.error("Error processing file:", error);
  }
};

const debouncedProcessFile = debounce(processFile, 300);

if (yonxConfig.i18n.dictionariesCodegen) {
  const watcher = chokidar.watch(i18nPath, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    ignoreInitial: true,
  });

  watcher
    .on("add", () => debouncedProcessFile())
    .on("change", () => debouncedProcessFile())
    .on("unlink", () => debouncedProcessFile())
    .on("rename", () => debouncedProcessFile());
} else {
  console.log("Dictionaries codegen disabled");
}
