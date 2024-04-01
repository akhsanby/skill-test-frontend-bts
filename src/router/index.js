import { createWebHistory, createRouter } from "vue-router";

import LoginView from "../view/Login.vue";
import RegisterView from "../view/Register.vue";
import HomeView from "../view/Home.vue";

const routes = [
  { path: "/", component: LoginView },
  { path: "/register", component: RegisterView },
  { path: "/home", component: HomeView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
