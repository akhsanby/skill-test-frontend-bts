import { createWebHistory, createRouter } from "vue-router";
import Cookies from "js-cookie";

import LoginView from "../view/Login.vue";
import RegisterView from "../view/Register.vue";
import HomeView from "../view/Home.vue";

const routes = [
  { path: "/", name: "Login", component: LoginView },
  { path: "/register", name: "Register", component: RegisterView },
  { path: "/home", name: "Home", component: HomeView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = Cookies.get("isAuthenticated");
  if (to.name === "Home" && !isAuthenticated) {
    next({ name: "Login" });
  } else if ((to.name === "Login" || to.name === "Register") && isAuthenticated) {
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
