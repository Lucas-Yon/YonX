import { defineConfig, presetWind, presetWebFonts } from "unocss";

export default defineConfig({
  presets: [
    presetWind({ preflight: false }),
    presetWebFonts({
      provider: "google", // default provider
      fonts: {
        // these will extend the default theme
        sans: "DM Sans",
        mono: "Space Mono",
        // custom ones
      },
    }),
  ],
  theme: {
    // Define your custom CSS variables
    colors: {
      background: "hsl(36, 39%, 88%)",
      foreground: "hsl(36, 45%, 15%)",
      primary: "hsl(36, 45%, 70%)",
      "primary-foreground": "hsl(36, 45%, 11%)",
      secondary: "hsl(40, 35%, 77%)",
      "secondary-foreground": "hsl(36, 45%, 25%)",
      accent: "hsl(36, 64%, 57%)",
      "accent-foreground": "hsl(36, 72%, 17%)",
      destructive: "hsl(0, 84%, 37%)",
      "destructive-foreground": "hsl(0, 0%, 98%)",
      muted: "hsl(36, 33%, 75%)",
      "muted-foreground": "hsl(36, 45%, 25%)",
      card: "hsl(36, 46%, 82%)",
      "card-foreground": "hsl(36, 45%, 20%)",
      popover: "hsl(0, 0%, 100%)",
      "popover-foreground": "hsl(240, 10%, 3.9%)",
      border: "hsl(36, 45%, 60%)",
      input: "hsl(36, 45%, 60%)",
      ring: "hsl(36, 45%, 30%)",
      "chart-1": "hsl(25, 34%, 28%)",
      "chart-2": "hsl(26, 36%, 34%)",
      "chart-3": "hsl(28, 40%, 40%)",
      "chart-4": "hsl(31, 41%, 48%)",
      "chart-5": "hsl(35, 43%, 53%)",
    },

    borderRadius: {
      DEFAULT: "0rem",
    },
  },
  preflights: [
    {
      // Add your custom preflight styles
      getCSS: () => `
      h1, h2, h3, h4, h5, h6 {
        font-family: 'DM Sans', sans-serif;
      }
      body {
        font-family: 'Space Mono', monospace;
      }
    `,
    },
  ],
});
