import { dictionaries } from "@/yonx/dictionaries";

const yonxConfig = {
  codegen: {
    jsmodule: {
      enabled: true,
      devPath: "src/client/module",
      distPath: "src/statics/dist",
    },
    pages: {
      enabled: true,
      pagesPath: "src/client/pages",
    },
    devsocket: {
      enabled: true,
      port: 7777,
    },
    cssmodule: {
      enabled: true,
      devPath: "src/client/css",
      distPath: "src/statics/dist",
    },
  },
  i18n: {
    enabled: true,
    skipValidation: ["/api", "/static"],
    dictionariesCodegen: true,
  },
};

export default yonxConfig;
