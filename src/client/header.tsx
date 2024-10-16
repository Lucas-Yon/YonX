import { type PropsWithChildren } from "hono/jsx";
import { css, Style } from "hono/css";
import { createGenerator } from "@unocss/core";
import unoConfig from "../../unocss.config";
import { Script, Scripts } from "@/scripts";

/******  c0d5fe8a-db10-46f7-a5e2-e76b1df8e29d  *******/ const Header = async (
  props: PropsWithChildren
) => {
  const generatedCss = await createGenerator(unoConfig).generate(
    `${props.children}`
  );

  return (
    <html>
      <head>
        <style href="/static/reset.css" />
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
        {/* <script src="/static/store.js" type={"module"}></script> */}
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>

      <body>{props.children}</body>
    </html>
  );
};

export default Header;
