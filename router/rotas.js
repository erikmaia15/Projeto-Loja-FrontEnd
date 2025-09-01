import { createWebHistory, createRouter } from "vue-router";
import Cadastro from "../src/views/cadastro.vue";
import Home from "../src/views/home.vue";
import Login from "../src/views/login.vue";
import areaDoAdministrador from "../src/views/areaDoAdministrador.vue";
import NotFound from "../src/views/pagenotfound.vue";
import userInfos from "../utils/userInfos";
import Sobre from "../src/views/sobre.vue";
import MinhasCompras from "../src/views/minhasCompras.vue";

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
    path: "/sobre",
    name: "sobre",
    component: Sobre,
  },
  {
    path: "/minhas-compras",
    name: "minhas-compras",
    component: MinhasCompras,
  },
  {
    path: "/area-do-administrador",
    name: "AreaDoAdministrador",
    component: areaDoAdministrador,
    meta: { requiresAdmin: true }, // <-- meta que indica que precisa ser admin
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guard global
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAdmin) {
    try {
      const response = await userInfos.getUserInfos();
      const isAdmin = response.data.usuario.isAdmin;

      if (!isAdmin) {
        return next({ name: "NotFound" }); // redireciona se não for admin
      }
    } catch (e) {
      return next({ name: "Login" }); // se der erro na requisição, manda pro login
    }
  }
  next();
});

export default router;
