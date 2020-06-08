import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Message from "./components/Message";
import "./icons";
import "@/assets/css/md2html.scss";

Vue.config.productionTip = false;
Vue.prototype.$Message = Message;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
