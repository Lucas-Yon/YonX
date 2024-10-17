import { config } from "unocss.config";
import { themes } from "./themes";
import { defineConfig } from "unocss";

export const customTheme = async (theme: keyof typeof themes | string) => {
  return defineConfig({
    layers: config.layers,
    presets: config.presets,
    theme: config.theme,
    preflights: [
      {
        // Add your custom preflight styles
        layer: "base",
        getCSS: () =>
          theme === "random"
            ? themes.random()
            : /* @ts-ignore */
              themes[theme in themes ? theme : "basic"],
      },
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
