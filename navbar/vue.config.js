const { ModuleFederationPlugin } = require("webpack").container;
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    output: {
      libraryTarget: "system",
    },
  },
});
