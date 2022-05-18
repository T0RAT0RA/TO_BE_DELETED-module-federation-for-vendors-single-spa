import { registerApplication, start } from "single-spa";

// registerApplication({
//   name: "@single-spa/welcome",
//   app: () =>
//     System.import(
//       "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
//     ),
//   activeWhen: ["/"],
// });

registerApplication({
  name: "@rob/navbar",
  // app: () => import("NavbarScope/ApplicationPage"),
  // app: () => import("mfe_1_vertical/App"),
  app: () => import("secure_messaging/App"),
  activeWhen: ["/"],
});

registerApplication({
  name: "secure-messaging",
  // app: () => import("NavbarScope/ApplicationPage"),
  app: () => import("secure_messaging/App"),
  activeWhen: ["/sm"],
});

start({
  urlRerouteOnly: true,
});
