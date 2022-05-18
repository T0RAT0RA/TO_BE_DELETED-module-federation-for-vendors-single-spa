const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "rob";

  // This singleSpaDefaults has SystemJSPublicPathWebpackPlugin as a plugin.
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  const config = {
    mode: "development",
    entry: "./src/index.js",
    module: { ...defaultConfig.module },
    devtool: "source-map",
    devServer: { ...defaultConfig.devServer, port: 9000 },
    plugins: defaultConfig.plugins.filter((plugin) => {
      return plugin.constructor.name !== "SystemJSPublicPathWebpackPlugin";
    }),
    resolve: { ...defaultConfig.resolve },
  };
  console.log(config);

  return merge(config, {
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: "src/index.module.federation.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
      new ModuleFederationPlugin({
        name: "shell",
        filename: "remoteEntry.js",
        remotes: {
          NavbarScope: "NavbarScope@http://localhost:8082/remoteEntry.js",
          // mfe_1_vertical: "mfe_1_vertical@/mfe1/remoteEntry.js",
          secure_messaging: "secure_messaging@/secure-messaging/remoteEntry.js",
        },
        shared: [{ ...deps }],
      }),
    ],
  });
};
