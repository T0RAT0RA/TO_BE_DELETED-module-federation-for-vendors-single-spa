// https://github.com/mdsmith00/single-spa-module-federation-react-and-angular/blob/master/shell/src/bootstrap.js
import { start, registerApplication } from "single-spa";
/**
 * Register applications here
 */
registerApplication(
  "reactNavApp",
  () => import("reactNavApp/NavBar"),
  () => true
);
