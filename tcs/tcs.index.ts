import { watch } from "fs";

const watcher = watch("../statics/dev", async (event, filename) => {
  try {
    console.log(`Detected ${event} in ${filename}`);
    if (filename && filename.endsWith(".ts")) {
      await Bun.build({
        entrypoints: [`../statics/dev/${filename}`],
        outdir: `../statics/dist/`,
        minify: false,
        conditions: ["browser"],
      });
    }
  } catch (error) {
    console.log(error);
  }
});

process.on("SIGINT", () => {
  console.log("Closing watcher...");
  watcher.close();
  process.exit(0);
});

console.log("Starting watcher...");
