import { jsx } from "hono/jsx";

// Custom JSX factory function
function customJsx(type: string | Function, props: any, ...children: any[]) {
  if (
    typeof type === "string" &&
    (type.startsWith(":") || type.startsWith("@"))
  ) {
    // Handle custom tag names
    const customElement = document.createElement("div");
    customElement.setAttribute("data-custom-tag", type);
    // Add props and children as needed
    return customElement;
  }

  // Default JSX behavior
  return jsx(type, props, ...children);
}

export default customJsx;
