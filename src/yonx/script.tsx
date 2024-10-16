import { FC } from "hono/jsx";
import { html, raw } from "hono/html";
import { getContext } from "hono/context-storage";
import { Env } from "@/HonoApp";

interface ScriptProps {
  children?: string;
  id?: string;
  src?: string;
}

interface ScriptData {
  content?: string;
  id?: string;
  src?: string;
}

interface ScriptManager {
  Script: FC<ScriptProps>;
  Scripts: FC;
}

export const createScriptManager = (): ScriptManager => {
  const map = new Map<string, Set<string>>();

  const contextManager = (
    action: "add" | "clear" | "get",
    data?: ScriptData
  ) => {
    const c = getContext<Env>();
    const currentRequestId = c.get("requestId");

    //@ts-ignore hack to avoid double render of scripts
    if (c.get("scriptCheck")) return;

    if (action === "get") {
      return map.get(currentRequestId);
    }
    if (action === "add" && data) {
      const dataAsString = JSON.stringify(data);
      const set = map.get(currentRequestId);
      map.set(
        currentRequestId,
        set ? set.add(dataAsString) : new Set([dataAsString])
      );
    }
    if (action === "clear") {
      map.delete(currentRequestId);
      //@ts-ignore
      c.set("scriptCheck", true);
    }
  };

  const Script: FC<ScriptProps> = ({ children, id, src }) => {
    const scriptData: ScriptData = {};
    if (children) scriptData.content = children;
    if (id) scriptData.id = id;
    if (src) scriptData.src = src;

    contextManager("add", scriptData);
    return null;
  };

  const Scripts: FC = () => {
    const currentSet = contextManager("get");
    if (!currentSet) return null;
    const result = html`${Array.from(currentSet).map((scriptString) => {
      const script = JSON.parse(scriptString) as ScriptData;
      if (script.src) {
        return html`<script
          id="${script.id || ""}"
          src="${script.src}"
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

const scriptManager = createScriptManager();

export const { Script, Scripts } = scriptManager;
