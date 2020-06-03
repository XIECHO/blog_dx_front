import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export const childRoutes = [
  {
    path: "home",
    name: "home",

    component: () => import("@/views/user/userHome"),
    meta: {
      keepAlive: true,
      title: "首页",
      showHeader: true,
      icon: "nav-home"
    }
  },
  {
    path: "about",
    name: "about",
    component: () => import("@/views/user/about"),
    meta: {
      title: "关于",
      icon: "nav-about"
    }
  }
];

const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "root",
      redirect: "/home",
      component: () => import("@/layout/index"),
      children: childRoutes
    },
    {
      path: "/github_login",
      name: "github_login",
      component: () => import("@/views/login/github_login"),
      meta: {
        title: "第三方登录"
      }
    },
    {
      path: "*",
      component: () => import("@/views/page404"),
      meta: {
        title: "404"
      }
    }
  ]
});

export default router;
