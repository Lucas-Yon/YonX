import { type PropsWithChildren } from "hono/jsx";
import { createGenerator } from "@unocss/core";
import { customTheme } from "./css/unocss";
import { getContext } from "hono/context-storage";
import type { Env } from "@/HonoApp";
import { Script, Scripts } from "@/scripts";
import { Styles, Style } from "@/styles";
import { Style as HonoStyle, css } from "hono/css";

const Header = async (props: PropsWithChildren) => {
  const c = getContext<Env>();
  // const theme = c.get("theme") || "theme/white";
  // console.log(theme);
  const cssconfig = await customTheme();
  const generatedCss = await createGenerator(cssconfig).generate(
    `${props.children}`
  );

  return (
    <html>
      <head>
        <Style dist="reset" />
        <Style dist="theme/basic" />
        <Script dist="worker/main" />
        <Script dist="utils/link" />
        <Styles />
        <style dangerouslySetInnerHTML={{ __html: generatedCss.css }} />
        <HonoStyle>{css`
          [x-cloak] {
            display: none !important;
          }
        `}</HonoStyle>
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>

      <body>{props.children}</body>
    </html>
  );
};

export default Header;
