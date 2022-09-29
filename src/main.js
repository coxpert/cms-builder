import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import { DropdownDirective } from "./utils/directives";

import "./styles/app.scss";

const app = createApp(App);

app.directive("dropdown", DropdownDirective);

app.use(store).use(router).mount("#app");
