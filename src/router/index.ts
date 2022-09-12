import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useStore } from "@/stores";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    alias: '/home',
    component: () => import("@/views/home/Home.vue"),
    meta: {
      requiredAuth : true
    },
  },
  {
    path: "/quote",
    name: "quote",
    alias: ['/:new(new)/quote/:id([0-9]+)','/quote/:id([0-9]+)'],
    component: () => import("@/views/quote/Quote.vue"),
    meta: {
      requiredAuth : true
    },
  },
  {
    path: "/quote",
    name: "shipment",
    alias: ['/:new(new)/shipment/:id([0-9]+)','/shipment/:id([0-9]+)'],
    component: () => import("@/views/shipment/Shipment.vue"),
    meta: {
      requiredAuth : true
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/Login.vue"),
    meta: {
      layout: "blank",
      requiredAuth : false
    },
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


router.beforeEach((to) => {
  // ✅ This will work because the router starts its navigation after
  // the router is installed and pinia will be installed too
  const store = useStore();
  store.setLoading(true)
  if (to.meta.requiredAuth && !store.isAuthenticated) return '/login'
});

router.afterEach(()=>{
  const store = useStore();
  store.setLoading(false)
});


export default router;
