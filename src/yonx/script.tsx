import type { FC } from "hono/jsx";
import { html, raw } from "hono/html";
import { getContext } from "hono/context-storage";
import type { Env } from "@/HonoApp";
import { ExistingScripts } from "@/scripts";
import { waitForValueChange } from "./utils";
import type { HtmlEscapedString } from "hono/utils/html";

interface ScriptProps {
  children?: string;
  id?: string;
  src?: string;
  dist?: keyof typeof ExistingScripts;
}

interface ScriptData {
  content?: string;
  id?: string;
  src?: string;
  dist?: keyof typeof ExistingScripts;
}

interface ScriptManager {
  Script: FC<ScriptProps>;
  Scripts: () => Promise<HtmlEscapedString>;
}

export const createScriptManager = (): ScriptManager => {
  const contextManager = (
    action: "add" | "clear" | "get",
    data?: ScriptData
  ) => {
    const c = getContext<
      Env & { Variables: { scripts?: Set<string> | "cleared" } }
    >();

    if (action === "get") {
      return c.get("scripts");
    }
    if (action === "add" && data) {
      const currentSet = c.get("scripts") || new Set<string>();
      if (currentSet === "cleared") return;
      c.set("scripts", currentSet.add(JSON.stringify(data)));
    }
    if (action === "clear") {
      c.set("scripts", "cleared");
    }
  };

  const Script: FC<ScriptProps> = (props) => {
    contextManager("add", props);
    return null;
  };

  const Scripts = async () => {
    const currentSet = contextManager("get");
    if (!currentSet || currentSet === "cleared") return <></>;
    await waitForValueChange();

    const result = html`${Array.from(currentSet).map((scriptString) => {
      const script = JSON.parse(scriptString) as ScriptData;
      if (script.src) {
        return html`<script
          id="${script.id || ""}"
          src="${script.src}"
        ></script>`;
      } else if (script.dist) {
        return html`<script
          id="${script.id || ""}"
          src="${ExistingScripts[script.dist]}"
          type="module"
        ></script>`;
      } else {
        return html`<script id="${script.id || ""}">
          ${raw(script.content || "")};
        </script>`;
      }
    })}`;
    contextManager("clear");
    return result;
  };
  return { Script, Scripts };
};
