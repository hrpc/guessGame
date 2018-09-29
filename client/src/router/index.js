import Vue from 'vue'
import Router from 'vue-router'
//  const HelloWorld = () => import('@/components/HelloWorld')
const Index = () => import('@/pages/Index')
const Login = () => import('@/pages/Login')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
