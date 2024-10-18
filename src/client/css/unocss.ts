import { config } from "unocss.config";
// import { themes } from "./themes";
import { defineConfig } from "unocss";
// import generateLayerBase from "@/yonx/generateTheme";

export const customTheme = async () => {
  return defineConfig({
    layers: config.layers,
    presets: config.presets,
    theme: config.theme,
    preflights: [
      // {
      //   // Add your custom preflight styles
      //   layer: "base",
      //   getCSS: () => generateLayerBase(),
      // },
      {
        layer: "base",
        getCSS: () => `
        @layer base {
          * {
            @apply border-border;
          }
          body {
            --at-apply: "bg-background text-foreground";
          }
        }
         `,
      },
    ],
  });
};
