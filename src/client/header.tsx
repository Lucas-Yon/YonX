import { type FC, type PropsWithChildren } from "hono/jsx";
import { cssGenerator } from "../../unocss/generate-css";

const Header = async (props: PropsWithChildren) => {
  const generatedCss = await cssGenerator.generate(`${props.children}`);
  return (
    <html>
      <head>
        <style>{generatedCss.css}</style>
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
      </head>
      <body>{props.children}</body>
    </html>
  );
};

export default Header;
