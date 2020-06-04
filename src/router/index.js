import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export const childRoutes = [
  {
    path: "home",
    name: "home",
    component: () => import("@/views/blog/home"),
    meta: {
      keepAlive: true,
      title: "首页",
      icon: "nav-home"
    }
  },
  {
    path: "article/:articleId",
    name: "article",
    hidden: true,
    component: () => import("@/views/blog/article"),
    meta: {
      title: "文章"
    }
  },
  {
    path: "tagArchived/:tag",
    name: "tagArchived",
    hidden: true,
    component: () => import("@/views/blog/tagArchive"),
    meta: {
      title: "标签"
    }
  },
  {
    path: "archive",
    name: "archive",
    component: () => import("@/views/blog/archive"),
    meta: {
      title: "归档",
      icon: "nav-archived"
    }
  },
  {
    path: "about",
    name: "about",
    component: () => import("@/views/blog/about"),
    meta: {
      title: "关于",
      icon: "nav-about"
    }
  },
  {
    path: "friend",
    name: "friend",
    component: () => import("@/views/blog/friend"),
    meta: {
      title: "友链",
      icon: "nav-friendLink"
    }
  }
];

const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "root",
      redirect: "/home",
      component: () => import("@/views/layout/index"),
      children: childRoutes
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
