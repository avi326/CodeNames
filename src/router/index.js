import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Guide from '@/components/Guide'
import TableOfGames from '@/components/TableOfGames'
import Chat from '@/components/Chat'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import Game from '@/components/game/Game'

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
    },
    {
      path: '/game',
      name: 'Game',
      component: Game,
      meta: {
        requiresAuth: true
      },
      props: true,
      beforeEnter: (to, from, next) => {
        if (to.params.conected_player) {
          next()
        } else {
          next({name: 'TableOfGames'})
        }
      }
    }
  ]
})
