import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Vue3Toasity from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import router from "./router";

createApp(App)
  .use(router)
  .use(Vue3Toasity, {
    autoClose: 3000,
  })
  .mount("#app");
