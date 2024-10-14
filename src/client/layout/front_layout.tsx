import { type FC, type PropsWithChildren } from "hono/jsx";
import Header from "@/client/header";

const FrontLayout: FC<PropsWithChildren> = (props: PropsWithChildren) => {
  return (
    <Header>
      <html class="bg-background h-full font-montserrat">
        <body class={"h-full"}>{props.children}</body>
      </html>
    </Header>
  );
};

export default FrontLayout;
