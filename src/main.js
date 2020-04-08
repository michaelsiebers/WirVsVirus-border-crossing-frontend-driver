import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormPage from "./components/FormPage";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Driver | Fast Border Crossing',
        // metaTags: [
        //   {
        //     name: 'description',
        //     content: 'The home page of our example app.'
        //   },
        //   {
        //     property: 'og:description',
        //     content: 'The home page of our example app.'
        //   }
        // ]
      }
    },
    {
      path: '/formPage/',
      name: 'formPage',
      component: FormPage,
      props: true,
      meta: {
        title: 'Form | Fast Border Crossing',
        // metaTags: [
        //   {
        //     name: 'description',
        //     content: 'The home page of our example app.'
        //   },
        //   {
        //     property: 'og:description',
        //     content: 'The home page of our example app.'
        //   }
        // ]
      }
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFound,
      meta: {
        title: 'Not Found | Fast Border Crossing',
        // metaTags: [
        //   {
        //     name: 'description',
        //     content: 'The home page of our example app.'
        //   },
        //   {
        //     property: 'og:description',
        //     content: 'The home page of our example app.'
        //   }
        // ]
      }
    }
  ],
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
});


Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
