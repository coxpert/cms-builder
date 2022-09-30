import { createApp } from "vue";
// import * as VueGoogleMaps from "vue2-google-maps";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { DropdownDirective } from "./utils/directives";

import "./styles/app.scss";

const app = createApp(App);

// app.use(VueGoogleMaps, {
//   load: {
//     key: "AIzaSyCloxJK3aIK9c7wNMn1wVnGCDHXh8Xei1c",
//     libraries: "places",
//   },
//   installComponents: false,
// });

app.directive("dropdown", DropdownDirective);
app.use(store).use(router).mount("#app");
