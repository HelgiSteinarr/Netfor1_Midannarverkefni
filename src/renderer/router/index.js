import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start-screen',
      component: require('@/components/StartScreen').default
    },
    {
      path: '/host',
      name: 'host-screen',
      component: require('@/components/HostScreen').default
    },
    {
      path: '/game',
      name: 'game-screen',
      component: require('@/components/GameScreen').default
    },
    {
      path: '/join',
      name: 'join-screen',
      component: require('@/components/JoinScreen').default
    },
    {
      path: '/exit',
      name: 'game-screen',
      component: require('@/components/GameScreen').default
    }
  ]
})
