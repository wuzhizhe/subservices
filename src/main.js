import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import ElementUI from 'element-ui'
import router from './router'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)
Vue.use(VueRouter)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
