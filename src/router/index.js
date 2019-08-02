import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Guide from '@/components/Guide'
import TableOfGames from '@/components/TableOfGames'
import Register from '@/components/Register'
import Chat from '@/components/Chat'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/guide',
      name: 'Guide',
      component: Guide
    },
    {
      path: '/tableofgames',
      name: 'TableOfGames',
      component: TableOfGames
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
      props: true,
      beforeEnter: (to, from, next) => {
        if (to.params.name) {
          next()
        } else {
          next({name: 'Home'})
        }

      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
