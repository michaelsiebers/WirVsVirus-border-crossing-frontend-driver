import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormPage from "./components/FormPage";
import LandingPage from "./components/LandingPage";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/formPage',
      name: 'formPage',
      component: FormPage
    },
    {
      path: '/',
      name: 'landingPage',
      component: LandingPage
    },
  ]
});


Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
