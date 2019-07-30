import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Guide from '@/components/Guide'
import TableOfGames from '@/components/TableOfGames'

Vue.use(Router)

export default new Router({
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
    }
  ]
})
