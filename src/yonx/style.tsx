import type { FC } from "hono/jsx";
import { html } from "hono/html";
import { getContext } from "hono/context-storage";
import type { Env } from "@/HonoApp";
import { ExistingStyles } from "@/styles";
import { Style as HonoStyle } from "hono/css";
import { waitForContextChange } from "./utils";
import type { HtmlEscapedString } from "hono/utils/html";

interface StyleProps {
  children?: string;
  id?: string;
  href?: string;
  dist?: keyof typeof ExistingStyles;
}

interface StyleData {
  content?: string;
  id?: string;
  href?: string;
  dist?: keyof typeof ExistingStyles;
}

interface StyleManager {
  Style: FC<StyleProps>;
  Styles: () => Promise<HtmlEscapedString>;
}

export const createStyleManager = (): StyleManager => {
  const contextManager = (
    action: "add" | "clear" | "get",
    data?: StyleData
  ) => {
    const c = getContext<
      Env & { Variables: { styles?: Set<string> | "cleared" } }
    >();

    if (action === "get") {
      return c.get("styles");
    }
    if (action === "add" && data) {
      const currentSet = c.get("styles") || new Set<string>();
      if (currentSet === "cleared") return;
      c.set("styles", currentSet.add(JSON.stringify(data)));
    }
    if (action === "clear") {
      c.set("styles", "cleared");
    }
  };

  const Style: FC<StyleProps> = ({ children, id, href, dist }) => {
    const styleData: StyleData = {};
    if (children) styleData.content = children;
    if (id) styleData.id = id;
    if (href) styleData.href = href;
    if (dist) styleData.dist = dist;

    contextManager("add", styleData);
    return null;
  };

  const Styles = async () => {
    const currentSet = contextManager("get");
    if (!currentSet || currentSet === "cleared") return <></>;
    await waitForContextChange("hack", true, 5);

    const result = html`${Array.from(currentSet).map((styleString) => {
      const style = JSON.parse(styleString) as StyleData;
      //   console.log(style);
      if (style.href) {
        return html`<link
          id="${style.id || ""}"
          href="${style.href}"
          rel="stylesheet"
        />`;
      } else if (style.dist) {
        return html`<link
          id="${style.id || ""}"
          href="${ExistingStyles[style.dist]}"
          rel="stylesheet"
        />`;
      } else {
        // TODO : Content style not working at all for some reason
        return (
          <style
            dangerouslySetInnerHTML={{ __html: style.content ?? "" }}
          ></style>
        );
      }
    })}`;
    contextManager("clear");
    return result;
  };

  return { Style, Styles };
};
