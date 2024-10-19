import { createStyleManager } from "./yonx/style";

const styleManager = createStyleManager();

export const ExistingStyles = {
  reset: "/static/css/reset-2d21bde7.css",
  unocss: "/static/css/unocss-cd89c570.css",
  "theme/basic": "/static/css/theme/basic-d41670eb.css",
  "theme/white": "/static/css/theme/white-f65b1b92.css",
};
export const { Style, Styles } = styleManager;
