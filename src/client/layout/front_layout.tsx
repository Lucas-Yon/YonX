import ToolsRoutes from "@/yonx/dev";
import { type FC, type PropsWithChildren } from "hono/jsx";

const FrontLayout: FC<PropsWithChildren> = (props: PropsWithChildren) => {
  return (
    // <Header>
    <html class="dark bg-background h-full font-montserrat">
      <body class={"h-full"}>{props.children}</body>
      <ToolsRoutes />
    </html>
  );
};

export default FrontLayout;
