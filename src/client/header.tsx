import { type PropsWithChildren } from "hono/jsx";
import { css, Style } from "hono/css";
import { createGenerator } from "@unocss/core";
import { customTheme } from "./css/unocss";
import { getContext } from "hono/context-storage";
import { Env } from "@/HonoApp";
import { Script, Scripts } from "@/scripts";

const Header = async (props: PropsWithChildren) => {
  const c = getContext<Env>();
  const cssconfig = await customTheme(c.var.theme ?? "basic");
  const generatedCss = await createGenerator(cssconfig).generate(
    `${props.children}`
  );

  return (
    <html>
      <head>
        <link rel="stylesheet" href="/static/reset.css" />
        <style dangerouslySetInnerHTML={{ __html: generatedCss.css }} />
        <Style>{css`
          [x-cloak] {
            display: none !important;
          }
        `}</Style>
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
