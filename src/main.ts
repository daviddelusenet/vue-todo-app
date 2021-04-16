import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faChevronDown,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/**
 * Add icons to the library to use the advantage of tree shaking
 * @see https://github.com/FortAwesome/vue-fontawesome#why-use-the-concept-of-a-library
 * Availabe icons
 * @see https://fontawesome.com/icons?d=gallery&p=2&s=solid&m=free
 */
library.add(faCheck, faChevronDown, faPlus, faTrashAlt);

/**
 * Add a global font-awesome-icon component add mount the application
 * @see https://github.com/FortAwesome/vue-fontawesome#usage
 */
const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
