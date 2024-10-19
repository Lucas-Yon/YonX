import { readdir, readFile } from "fs/promises";
import { resolve, join } from "path";
import chokidar from "chokidar";

// Function to find and concatenate content of all .tsx and .jsx files
async function concatenateFiles(directory: string): Promise<string> {
  let combinedContent = "";
  console.log("yooo");

  // Helper function to read a directory recursively
  async function readDirectory(dir: string): Promise<void> {
    const files = await readdir(dir, { withFileTypes: true });

    for (const file of files) {
      const filePath = join(dir, file.name);

      if (file.isDirectory()) {
        // Recursively read directories
        await readDirectory(filePath);
      } else if (
        file.isFile() &&
        (file.name.endsWith(".tsx") || file.name.endsWith(".jsx"))
      ) {
        // Read and concatenate .tsx or .jsx file content
        const content = await readFile(filePath, "utf-8");
        combinedContent += content + "\n"; // Adding a newline for separation
      }
    }
  }

  await readDirectory(directory);
  return combinedContent;
}

// Example usage
const main = async () => {
  const directoryPath = resolve("./src"); // Adjust the path to your source directory
  const result = await concatenateFiles(directoryPath);
  console.log(result.length); // This will print the combined content of all .tsx and .jsx files
};

const watcherGlobalcss = chokidar.watch(["src/**/*.tsx"], {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  ignoreInitial: true,
});

watcherGlobalcss
  .on("add", () => main())
  .on("change", () => main())
  .on("unlink", () => main());

// console.log("yo");
