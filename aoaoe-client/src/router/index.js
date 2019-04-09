import Vue from 'vue'
import Router from 'vue-router'
// import Index from '../views/index.vue'
// import Faxian from '../views/faxian.vue'
// import Dingdan from '../views/dingdan.vue'
// import Profile from '../views/profile.vue'
// import Login from '../views/login.vue'
// import ShopDetail from '../views/shopdetail.vue';
// import Ratings from '@/components/ratings/Ratings';
// import Seller from '@/components/seller/Seller';
// import Goods from '@/components/goods/Goods';
// import Userinfo from '../views/useinfo.vue';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/shopdetail/:id",
      redirect: "/shopdetail/:id/goods"
    }, //重定向
    {
      path: '/index',
      name: 'index',
      component: () => import('../views/index.vue'),
      meta: {
        showFooter: true
      }
    },
    {
      path: '/faxian',
      name: 'faxian',
      component: () => import('../views/faxian.vue'),
      meta: {
        showFooter: true
      }
    },
    {
      path: '/dingdan',
      name: 'dingdan',
      component: () => import('../views/dingdan.vue'),
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/profile.vue'),
      meta: {
        showFooter: true
      }
    },
    {
      path: '/userinfo',
      name: 'userinfo',
      component: () => import('../views/useinfo.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/address',
      name: 'address',
      component: () => import('../components/address/Address.vue')
    },
    {
      path: '/shopdetail/:id',
      name: 'detail',
      component: () => import('../views/shopdetail.vue'),
      children: [{
        path: '/shopdetail/:id/goods',
        name: 'goods',
        component: () => import('../components/goods/Goods.vue')
      },
      {
        path: '/shopdetail/:id/ratings',
        name: 'ratings',
        component: () => import('../components/ratings/Ratings.vue')
      },
      {
        path: '/shopdetail/:id/seller',
        name: 'seller',
        component: () => import('../components/seller/Seller.vue')
      }
      ]
    },
  ]
})
