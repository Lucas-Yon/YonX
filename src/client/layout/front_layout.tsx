import { type FC, type PropsWithChildren } from "hono/jsx";
import Header from "@/client/header";
import DevBar from "@/yonx/dev";

const FrontLayout: FC<PropsWithChildren> = (props: PropsWithChildren) => {
  return (
    <Header>
      <html class="dark bg-background h-full font-montserrat">
        <body class={"h-full"}>{props.children}</body>
      </html>
      <DevBar />
    </Header>
  );
};

export default FrontLayout;
