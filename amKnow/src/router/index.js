import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component:  resolve => require(['@/components/page/Login'], resolve)
    },
    {
      path: '/notFound',
      name: 'NotFound',
      component:  resolve => require(['@/components/page/NotFound'], resolve)
    },
    {
      path: '/',
      redirect:'/login',
      name: 'Home',
      component: () => import(/* webpackChunkName: "index" */ '../components/common/Home'),
      children: [
        {
          path: 'index',
          name: 'Index',
          component:  resolve => require(['@/components/page/Index'], resolve),
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: 'user',
          name: 'User',
          component:  resolve => require(['@/components/page/User'], resolve),
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: 'fileManager',
          name: 'FileManager',
          component:  resolve => require(['@/components/page/FileManager'], resolve),
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: 'collection',
          name: 'Collection',
          component:  resolve => require(['@/components/page/Collection'], resolve),
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: 'share',
          name: 'Share',
          component: () => import(/* webpackChunkName: "index" */ '../components/page/Share'),
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: 'rubbish',
          name: 'Rubbish',
          component:  resolve => require(['@/components/page/Rubbish'], resolve),
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: 'setting',
          name: 'Setting',
          component:  resolve => require(['@/components/page/Setting'], resolve),
          meta: {
            keepAlive: true // 需要缓存
          }
        },
      ]
    },
    {
      path: '*',
      redirect: '/notFound'
    }
  ]
})
