import { createRouter, createWebHistory } from "vue-router";

import SignIn from "@/components/auth/SignIn.vue";
import SignOut from "@/components/auth/SignOut.vue";
import SignUp from "@/components/auth/SignUp.vue";
import Dashboard from "@/components/pages/Dashboard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "auth.signin",
      component: SignIn,
    },
    {
      path: "/signout",
      name: "auth.signout",
      component: SignOut,
    },
    {
      path: "/signup",
      name: "auth.signup",
      component: SignUp,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "dashboard" },
    },
  ],
});

export default router;
