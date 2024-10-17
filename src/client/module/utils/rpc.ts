import type { AppType } from "@/server/api/root";
import { hc } from "hono/client";

export const client = hc<AppType>(location.origin);
