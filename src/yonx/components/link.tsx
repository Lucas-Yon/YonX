import type { JSXNode } from "hono/jsx";
import type { TransformedRoutes } from "../pages";
import type { Env } from "@/HonoApp";

import { getContext } from "hono/context-storage";

interface linkProps {
  // Add props here
  children: JSXNode["children"][0];
  href: TransformedRoutes;
}

function Link(props: linkProps) {
  const c = getContext<Env>();
  const i18 = c.var.i18n;
  const href = i18 ? "/" + i18.userLanguage + props.href : props.href;

  return (
    <span data-nav={href} class={"link"}>
      {props.children}
    </span>
  );
}

export default Link;
