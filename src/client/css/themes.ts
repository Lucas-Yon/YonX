import generateLayerBase from "@/yonx/generateTheme";

export const themes = {
  random: () => generateLayerBase(),
  basic: `
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
  `,
  white: `@layer base {
    :root {
      --background: 0 0% 100%;
      --foreground: 211 69% 44%;
      --muted: 0 12% 90%;
      --muted-foreground: 0 12% 30%;
      --popover: 0 0% 97%;
      --popover-foreground: 211 69% 34%;
      --card: 0 0% 98%;
      --card-foreground: 211 69% 39%;
      --border: 0 0% 95%;
      --input: 0 0% 92%;
      --primary: 0 0% 17%;
      --primary-foreground: 0 0% 77%;
      --secondary: 0 0% 75%;
      --secondary-foreground: 0 0% 15%;
      --accent: 0 0% 85%;
      --accent-foreground: 0 0% 25%;
      --destructive: 7 87% 31%;
      --destructive-foreground: 7 87% 91%;
      --ring: 0 0% 17%;
      --radius: 0.5rem;
    }
  
    .dark {
      --background: 0 0% 100%;
      --foreground: 211 69% 44%;
      --muted: 0 12% 90%;
      --muted-foreground: 0 12% 30%;
      --popover: 0 0% 97%;
      --popover-foreground: 211 69% 34%;
      --card: 0 0% 98%;
      --card-foreground: 211 69% 39%;
      --border: 0 0% 95%;
      --input: 0 0% 92%;
      --primary: 0 0% 17%;
      --primary-foreground: 0 0% 77%;
      --secondary: 0 0% 75%;
      --secondary-foreground: 0 0% 15%;
      --accent: 0 0% 85%;
      --accent-foreground: 0 0% 25%;
      --destructive: 7 87% 31%;
      --destructive-foreground: 7 87% 91%;
      --ring: 0 0% 17%;
    }
  }`,
};
