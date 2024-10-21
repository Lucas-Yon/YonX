import type { FC } from "hono/jsx";
import { html } from "hono/html";
import { getContext } from "hono/context-storage";
import type { Env } from "@/HonoApp";
import { ExistingStyles } from "@/styles";
import { waitForValueChange } from "./utils";
import type { HtmlEscapedString } from "hono/utils/html";

interface StyleProps {
  children?: string;
  id?: string;
  href?: string;
  preload?: boolean;
  dist?: keyof typeof ExistingStyles;
}

interface StyleData {
  content?: string;
  id?: string;
  href?: string;
  dist?: keyof typeof ExistingStyles;
  preload?: boolean;
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

  const Style: FC<StyleProps> = (props) => {
    contextManager("add", props);
    return null;
  };

  const Styles = async () => {
    const currentSet = contextManager("get");
    if (!currentSet || currentSet === "cleared") return <></>;
    await waitForValueChange();

    const result = html`${Array.from(currentSet).map((styleString) => {
      const style = JSON.parse(styleString) as StyleData;
      if (style.href || style.dist) {
        const link = style.dist
          ? ExistingStyles[style.dist]
          : (style.href as string);
        return html`
          <link
            ${style.id || style.dist ? `id=css/${style.id || style.dist}` : ""}
            href="${link}"
            rel="stylesheet"
          />
          ${style.preload ? <link rel="preload" as="style" href={link} /> : ""}
        `;
      } else {
        return (
          <style dangerouslySetInnerHTML={{ __html: style.content ?? "" }} />
        );
      }
    })}`;
    contextManager("clear");
    return result;
  };

  return { Style, Styles };
};
