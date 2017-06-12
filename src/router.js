import VueRouter from 'vue-router'

const Home = require('./home/home.vue');

const routes = [
  { path: '/home', component: Home }
];


const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  next()
})

export default router;