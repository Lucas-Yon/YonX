// import { createGenerator } from "@unocss/core";
// import { customTheme } from "./css/unocss";
import { getContext } from "hono/context-storage";
import type { Env } from "@/HonoApp";
import { Script, Scripts } from "@/scripts";
import { Styles, Style } from "@/styles";
import { Style as HonoStyle, css } from "hono/css";
import { Hack } from "@/yonx/hack";
import { jsxRenderer } from "hono/jsx-renderer";
import { HonoApp } from "@/HonoApp";

const Hono = new HonoApp();

// const theme = c.get("theme") || "theme/white";
// const cssconfig = await customTheme();
// const generatedCss = await createGenerator(cssconfig).generate(
//   `${props.children}`
// );
{
  /* <style dangerouslySetInnerHTML={{ __html: generatedCss.css }} /> */
}

Hono.app.use(
  "*",
  jsxRenderer(
    ({ children }) => {
      const c = getContext<Env>();

      return (
        <html lang={c.var.i18n?.userLanguage ?? "en"}>
          <head>
            <Style dist="reset" />
            <Style dist="theme/basic" />
            <Script dist="worker/main" />
            <Script dist="utils/link" />
            <Style dist="unocss" preload />
            <HonoStyle>{css`
              [x-cloak] {
                display: none !important;
              }
            `}</HonoStyle>
            <Script>
              {`/*to prevent Firefox FOUC, this must be here*/
             let BLOCK_FIREFOX_FOUC;"`}
            </Script>
            <Styles />
            <Scripts />
            <script
              defer
              src="https://cdn.jsdelivr.net/npm/@alpinejs/focus@3.x.x/dist/cdn.min.js"
            ></script>
            <script
              defer
              src="https://cdn.jsdelivr.net/npm/@alpinejs/sort@3.x.x/dist/cdn.min.js"
            ></script>
            <script
              defer
              src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"
            ></script>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
          </head>
          <body>{children}</body>

          {/* DO NOT REMOVE  */}
          <Hack />
        </html>
      );
    },
    { docType: true }
  )
);

export default Hono.app;
