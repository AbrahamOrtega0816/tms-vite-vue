import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useStore } from "@/stores";



const ifNotAuthenticated = (to: any, from: any, next: any) => {

  const store = useStore();

  if (!store.isAuthenticated) {
    next();
    return;
  }
  next("/");
};

const ifAuthenticated = (to: any, from: any, next: any) => {

 const store = useStore();

  if (store.isAuthenticated) {
    next();
    return;
  }
  next("/login");
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    alias: '/home',
    component: () => import("@/views/home/Home.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/quote",
    name: "quote",
    alias: ['/:new(new)/quote/:id([0-9]+)','/quote/:id([0-9]+)'],
    component: () => import("@/views/quote/Quote.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/quote",
    name: "shipment",
    alias: ['/:new(new)/shipment/:id([0-9]+)','/shipment/:id([0-9]+)'],
    component: () => import("@/views/shipment/Shipment.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/Login.vue"),
    meta: {
      layout: "blank",
    },
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404/404.vue"),
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "404",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
