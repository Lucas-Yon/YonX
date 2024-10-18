
export const dictionaries = {
    pt: {
        "auth/login": () =>
      import("@/i18n/dictionaries/auth/login/pt.json").then(
        (module) => module.default
      ),
  },
  en: {
        "auth/login": () =>
      import("@/i18n/dictionaries/auth/login/en.json").then(
        (module) => module.default
      ),
  },
  fr: {
        "auth/login": () =>
      import("@/i18n/dictionaries/auth/login/fr.json").then(
        (module) => module.default
      ),
  }
};
