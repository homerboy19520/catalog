import Vue from "vue";
import App from "./App.vue";
import VBodyScrollLock from "v-body-scroll-lock";

Vue.use(VBodyScrollLock);

Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App),
}).$mount("#app");
