import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Register from './views/Register.vue'
import Notfound from './views/404.vue'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import FoundList from './views/FoundList'
import AndroidList from './views/AndroidList'
import ReadingList from './views/ReadingList'
import InfoShow from './views/InfoShow'
import Addfoodlist from './views/Addfoodlist'
import Foodlist from './views/Foodlist'
import Adddiscount from './views/Adddiscount'
import Dislist from './views/Dislist'
import Menus from './views/Menus'
import Adminlist from './views/Adminlist'
import Menulist from './views/Menulist'
import Understand from './views/Understand'

Vue.use(Router)

const router =  new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path:'/index',
      name:'index',
      component: Index,
      children:[
        { path: '', component: Home },
        { path: '/home', name: 'home', component: Home }, 
        { path: '/foundlist', name: 'foundlist', component: FoundList },
        { path: '/androidlist', name: 'androidlist', component: AndroidList },
        { path: '/readinglist', name: 'readinglist', component: ReadingList },
        { path: '/infoshow', name: 'infoshow', component: InfoShow },
        { path:'/addfoodlist/:id', name:'addfoodlist', component: Addfoodlist },
        { path:'/foodlist', name:'foodlist', component: Foodlist },
        { path:'/adddiscount', name:'adddiscount', component: Adddiscount },
        { path:'/dislist', name:'dislist', component: Dislist },
        { path:'/menus', name:'menus', component: Menus },
        { path:'/adminlist', name:'adminlist', component: Adminlist },
        { path:'/menulist', name:'menulist', component: Menulist },
        { path:'/understand', name:'understand', component: Understand },
      ]
    },
    {
      path:'/register',
      name:'register',
      component: Register
    },
    {
      path:'*',
      name:'404',
      component: Notfound
    },
    {
      path:'/login',
      name:'login',
      component: Login
    },
    
  ]
});


// 添加路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  // console.log(isLogin)
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
})

export default router;