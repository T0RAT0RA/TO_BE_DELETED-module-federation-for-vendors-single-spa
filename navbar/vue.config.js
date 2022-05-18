const { ModuleFederationPlugin } = require("webpack").container;
const { defineConfig } = require("@vue/cli-service");
const deps = require("./package.json").dependencies;

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    // output: {
    //   libraryTarget: "system",
    // },
    plugins: [
      new ModuleFederationPlugin({
        name: "NavbarScope",
        filename: "remoteEntry.js",
        exposes: {
          "./ApplicationPage": "./src/App",
          "./AboutPage": "./src/views/AboutView",
        },
        shared: [
          {
            ...deps,
            vue: {
              requiredVersion: deps.vue,
              singleton: true,
            },
            "vue-router": {
              requiredVersion: deps["vue-router"],
              singleton: true,
            },
          },
        ],
      }),
    ],
  },
  chainWebpack: (config) => {
    config.plugins.delete("StandaloneSingleSpaPlugin");
    config.plugins.delete("SystemJSPublicPathWebpackPlugin");
  },
});
