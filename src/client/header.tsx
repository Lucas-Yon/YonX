import { type FC, type PropsWithChildren } from "hono/jsx";
import { cssGenerator } from "../../unocss/generate-css";
import { css, Style } from "hono/css";

const Header = async (props: PropsWithChildren) => {
  const generatedCss = await cssGenerator.generate(`${props.children}`);

  return (
    <html class={"h-full"}>
      <head>
        <style>{generatedCss.css}</style>
        <Style>{css`
          [x-cloak] {
            display: none;
          }
        `}</Style>
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
        <script src="/static/store.js"></script>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Yonx</title>
      </head>

      <body class={"h-full bg-blue-200"}>{props.children}</body>
    </html>
  );
};

export default Header;
