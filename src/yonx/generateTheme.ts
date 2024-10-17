function generateRandomColor(): string {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 100);
  const lightness = Math.floor(Math.random() * 100);
  return `${hue} ${saturation}% ${lightness}%`;
}

function generateLayerBase(): string {
  const variables = [
    "--background",
    "--foreground",
    "--muted",
    "--muted-foreground",
    "--popover",
    "--popover-foreground",
    "--card",
    "--card-foreground",
    "--border",
    "--input",
    "--primary",
    "--primary-foreground",
    "--secondary",
    "--secondary-foreground",
    "--accent",
    "--accent-foreground",
    "--destructive",
    "--destructive-foreground",
    "--ring",
    "--radius",
  ];

  const darkVariables = [
    "--background",
    "--foreground",
    "--muted",
    "--muted-foreground",
    "--popover",
    "--popover-foreground",
    "--card",
    "--card-foreground",
    "--border",
    "--input",
    "--primary",
    "--primary-foreground",
    "--secondary",
    "--secondary-foreground",
    "--accent",
    "--accent-foreground",
    "--destructive",
    "--destructive-foreground",
    "--ring",
  ];

  const radius = "0.5rem"; // Keep radius consistent

  const baseLayer = variables
    .map((variable) => {
      const value = variable === "--radius" ? radius : generateRandomColor();
      return `      ${variable}: ${value};`;
    })
    .join("\n");

  const darkLayer = darkVariables
    .map((variable) => {
      const value = generateRandomColor();
      return `      ${variable}: ${value};`;
    })
    .join("\n");

  return `@layer base {
    :root {
${baseLayer}
    }
    .dark {
${darkLayer}
    }
  }`;
}

export default generateLayerBase;
