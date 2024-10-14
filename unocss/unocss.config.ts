import { defineConfig, presetWind, presetWebFonts } from "unocss";

export default defineConfig({
  presets: [
    presetWind({ preflight: true, dark: "class" }),
    presetWebFonts({
      provider: "google", // default provider
      fonts: {
        // these will extend the default theme
        // sans: "DM Sans:400",
        // mono: "Space Mono",
        montserrat: "Montserrat",
        // custom ones
      },
    }),
  ],
  theme: {
    // Define your custom CSS variables
    colors: {
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
  },
  preflights: [
    {
      // Add your custom preflight styles
      getCSS: () => `
      /* Add your custom preflight styles here */
      @layer base {
      :root {
        --background: 229 57% 100%;
        --foreground: 229 63% 4%;
        --muted: 229 12% 86%;
        --muted-foreground: 229 10% 37%;
        --popover: 0 0% 99%;
        --popover-foreground: 229 63% 3%;
        --card: 0 0% 99%;
        --card-foreground: 229 63% 3%;
        --border: 220 13% 91%;
        --input: 220 13% 91%;
        --primary: 229 100% 62%;
        --primary-foreground: 0 0% 100%;
        --secondary: 229 20% 90%;
        --secondary-foreground: 229 20% 30%;
        --accent: 229 28% 85%;
        --accent-foreground: 229 28% 25%;
        --destructive: 3 100% 50%;
        --destructive-foreground: 3 0% 100%;
        --ring: 229 100% 62%;
        --radius: 0.5rem;
      }
    
      .dark {
        --background: 229 41% 4%;
        --foreground: 229 23% 99%;
        --muted: 229 12% 14%;
        --muted-foreground: 229 10% 63%;
        --popover: 229 41% 5%;
        --popover-foreground: 0 0% 100%;
        --card: 229 41% 5%;
        --card-foreground: 0 0% 100%;
        --border: 215 27.9% 16.9%;
        --input: 215 27.9% 16.9%;
        --primary: 229 100% 62%;
        --primary-foreground: 0 0% 100%;
        --secondary: 229 14% 8%;
        --secondary-foreground: 229 14% 68%;
        --accent: 229 23% 17%;
        --accent-foreground: 229 23% 77%;
        --destructive: 3 89% 54%;
        --destructive-foreground: 0 0% 100%;
        --ring: 229 100% 62%;
      }
    }
    @layer base {
      * {
        @apply border-border;
      }
      body {
        @apply bg-background text-foreground;
      }
    }
  
    `,
    },
  ],
});
