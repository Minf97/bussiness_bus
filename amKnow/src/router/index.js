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
          path: 'automobileInfMng',
          name: 'AutomobileInfMng',
          component:  resolve => require(['@/components/page/AutomobileInfMng'], resolve),
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: 'automobileBrandMng',
          name: 'AutomobileBrandMng',
          component:  resolve => require(['@/components/page/AutomobileBrandMng'], resolve),
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: 'stockManage',
          name: 'StockMng',
          component:  resolve => require(['@/components/page/StockMng'], resolve),
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: 'Plan_management',
          name: 'PlanManagement',
          component:  resolve => require(['@/components/page/PlanManagement'], resolve),
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: 'Knowledge_base',
          name: 'KnowledgeBase',
          component:  resolve => require(['@/components/page/KnowledgeBase'], resolve),
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: 'Spare_parts_management',
          name: 'SparePartsManagement',
          component: () => import(/* webpackChunkName: "index" */ '../components/page/SparePartsManagement'),
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: 'Dispatch_management',
          name: 'DispatchManagement',
          component:  resolve => require(['@/components/page/DispatchManagement'], resolve),
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
