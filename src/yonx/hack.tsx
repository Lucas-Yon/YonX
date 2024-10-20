import { getContext } from "hono/context-storage";
import type { Env } from "@/HonoApp";
import { EE } from "./utils";

export function Hack() {
  const c = getContext<Env>();
  EE.emit(c.var.requestId);
  EE.removeAllListeners(c.var.requestId);
  return <></>;
}
