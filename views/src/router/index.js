import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Posts from '@/components/Posts'
import Hello from '@/components/Hello'
import Signup from '@/components/Signup'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        { path: '', name: 'home', components: { posts: Posts, sidebar: Hello } }
      ]
    },
    {
      path: '/signup',
      component: Signup,
      name: 'signup'
    },
    {
      path: '/login',
      component: Login,
      name: 'login'
    }
  ]
})
