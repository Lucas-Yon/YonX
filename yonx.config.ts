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
      enabled: false,
      port: 7777,
    },
  },
};

export default yonxConfig;
