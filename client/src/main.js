// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueCookie from 'vue-cookie'
import axios from 'axios'
import baseUrl from './config/baseUrl'

Vue.use(VueCookie)
Vue.config.productionTip = false
axios.defaults.baseURL = baseUrl

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
