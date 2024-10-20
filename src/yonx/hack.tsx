import { getContext } from "hono/context-storage";
import type { Env } from "@/HonoApp";

export function Hack() {
  const c = getContext<Env & { Variables: { hack?: boolean } }>();
  c.set("hack", true);
  return <></>;
}
