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
