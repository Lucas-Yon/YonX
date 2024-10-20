import { getContext } from "hono/context-storage";
import EventEmitter from "eventemitter3";
import type { Env } from "hono";

export const EE = new EventEmitter();
export const debounce = (fn: Function, ms = 1000) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export const getHash = (text: string) => {
  const hasher = new Bun.CryptoHasher("md5");
  hasher.update(text);
  return hasher.digest().toString("hex").slice(0, 8);
};

export async function waitForValueChange(event?: string): Promise<void> {
  const requestID = event ? event : getContext<Env>().var.requestId;
  return new Promise<void>((resolve) => {
    const handler = () => {
      resolve();
      EE.off(requestID, handler);
    };
    EE.on(requestID, handler);
  });
}
