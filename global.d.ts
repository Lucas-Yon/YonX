import { Alpine as AlpineType } from "alpinejs";

declare global {
  var Alpine: AlpineType;
}

// declare module "hono/jsx" {
//   namespace JSX {
//     interface HTMLAttributes {
//       "x-data"?: string;
//       "x-init"?: string;
//       "x-show"?: string;
//       [`x-bind:`]?: string; //
//     }
//   }
// }
