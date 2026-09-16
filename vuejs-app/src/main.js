import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "admin-lte/dist/js/adminlte.min.js";

import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router/index.js";
import { useUserStore } from "@/stores/user.js";
import { apiVerify } from "@/functions/api/auth.js";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.mount("#app");

const userStore = useUserStore();
router.beforeEach(async (to, frxom) => {
  try {
    const token = userStore.getSanctumToken();
    const response = await apiVerify(token);
    const { data } = response;
    userStore.setState(data.user);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      userStore.reset();
    }
  }

  const guarded = to.meta.guarded;
  if (guarded === undefined) {
    // if the route is not guarded, do nothing
    return;
  }

  if (guarded && !userStore.isAuthenticated) {
    // if the route is guarded and the user is not authenticated, redirect to signin page
    return { name: "auth.signin" };
  }
  if (!guarded && userStore.isAuthenticated) {
    // if the route is not guarded and the user is authenticated, redirect to dashboard page
    return { name: "dashboard" };
  }
});
