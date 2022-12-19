import { createApp } from "vue";
import Element from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import App from "./App.vue";
import "./assets/style/styles.scss";
// import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueDragDrop from "vue-drag-drop";
import { socketService } from "./service/socket.service.js";

const app = createApp(App);

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTasks,
  faPlus,
  faTimes,
  faSearch,
  faUsers,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faTrello } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

socketService.setup();
library.add(faTasks, faPlus, faTimes, faSearch, faUsers, faCheck);
library.add(faTrello);

app.component("font-awesome-icon", FontAwesomeIcon);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(Element);
app.use(router);
app.use(store);
app.use(VueDragDrop);
app.mount("#app");
