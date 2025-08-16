import { createWebHistory, createRouter } from "vue-router";
import Cadastro from "../src/views/cadastro.vue";
import Home from "../src/views/home.vue";
import Login from "../src/views/login.vue";
import NotFound from "../src/views/pagenotfound.vue";

const routes = [
  {
    path: "/",
    name: "root",
    redirect: "/cadastro",
  },
  {
    path: "/cadastro",
    name: "cadastro",
    component: Cadastro,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/:thMatch(.*)*", // Captura qualquer rota não definida
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
