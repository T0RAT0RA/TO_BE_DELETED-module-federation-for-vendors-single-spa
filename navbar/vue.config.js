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
        filename: "remoteEntry.js",
        name: "ROB_NAVBAR",
        exposes: [
          {
            App: "./src/App.vue",
          },
        ],
        shared: [
          {
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
