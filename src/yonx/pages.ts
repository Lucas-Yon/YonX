import type { Hono } from "hono";
import { i18n } from "@/i18n/i18n.config";
import { Pages } from "@/client/pages/root";

type ExtractHonoRoutes<T> = T extends Hono<any, infer R> ? keyof R : never;

type Lang = (typeof i18n)["locales"][number];

type ReplacePathParams<T extends string> =
  T extends `${infer _}:lang/${infer Rest}`
    ? `${Lang}/${ReplaceParams<Rest>}`
    : T extends `${infer Start}:${infer _}/${infer Rest}`
    ? `${Start}${string}/${ReplaceParams<Rest>}`
    : T extends `${infer Start}:${infer _}`
    ? `${Start}${string}`
    : T;

type ReplaceParams<T extends string> =
  T extends `${infer Start}:${infer _}/${infer Rest}`
    ? `${Start}${string}/${ReplaceParams<Rest>}`
    : T extends `${infer Start}:${infer _}`
    ? `${Start}${string}`
    : T;
type TransformRoutes<T extends string> = T extends any
  ? ReplacePathParams<T>
  : never;

export type Routes = ExtractHonoRoutes<typeof Pages>;
export type TransformedRoutes = TransformRoutes<Routes>;
