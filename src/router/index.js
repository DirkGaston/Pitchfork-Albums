import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import Albums from "../views/Albums.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import { currentUserPromise } from "../firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      auth: true,
    },
  },
  {
    path: "/albums",
    name: "albums",
    component: Albums,
    meta: {
      auth: true,
    },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  console.log("entraste al beforeEach");

  const requireAuth = to.meta.auth;
  const user = await currentUserPromise();

  if (requireAuth) {
    if (user) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
