import { createRouter, createWebHistory } from "vue-router";

import SignIn from "@/components/auth/SignIn.vue";
import SignOut from "@/components/auth/SignOut.vue";
import SignUp from "@/components/auth/SignUp.vue";
import Dashboard from "@/components/pages/Dashboard.vue";
import VerifyEmail from "@/components/auth/VerifyEmail.vue";
import ResetPassword from "@/components/auth/ResetPassword.vue";
import SetNewPassword from "@/components/auth/SetNewPassword.vue";
import GoogleOAuth from "@/components/auth/GoogleOAuth.vue";

import Navbar from "@/components/includes/Navbar.vue";
import LeftSidebar from "@/components/includes/LeftSidebar.vue";
import RightSidebar from "@/components/includes/RightSidebar.vue";
import Footer from "@/components/includes/Footer.vue";
import Profile from "@/components/auth/Profile.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "auth.signin",
      component: SignIn,
      meta: {
        guarded: false,
      },
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
      meta: {
        guarded: false,
      },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      components: {
        default: Dashboard,
        navbar: Navbar,
        left_sidebar: LeftSidebar,
        right_sidebar: RightSidebar,
        footer: Footer,
      },
      meta: { guarded: true },
    },
    {
      path: "/profile",
      name: "profile",
      components: {
        default: Profile,
        navbar: Navbar,
        left_sidebar: LeftSidebar,
        right_sidebar: RightSidebar,
        footer: Footer,
      },
      meta: { guarded: true },
    },
    {
      path: "/verify/email",
      name: "auth.verify.email",
      component: VerifyEmail,
      meta: {
        guarded: false,
      },
    },
    {
      path: "/reset-password",
      name: "auth.reset-password",
      component: ResetPassword,
      meta: { guarded: false },
    },
    {
      path: "/set-new-password",
      name: "auth.set-new-password",
      component: SetNewPassword,
      meta: { guarded: false },
    },
    {
      path: "/google/oauth/callback",
      name: "auth.google.oauth.callback",
      component: GoogleOAuth,
      meta: { guarded: false },
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "dashboard" },
    },
  ],
});

export default router;
