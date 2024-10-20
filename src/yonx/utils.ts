import { getContext } from "hono/context-storage";
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

export async function waitForContextChange(key: string, goal: any, ms: number) {
  return new Promise((resolve) => {
    const checkValue = () => {
      const c = getContext();
      //@ts-ignore we don't know what's in the context
      const value = c.get(key);
      if (value === goal) {
        resolve("Value changed!");
      } else {
        setTimeout(checkValue, ms);
      }
    };
    checkValue();
  });
}
