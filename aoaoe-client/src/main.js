// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'   //引入store
import 'lib-flexible/flexible' //px转rem配置

import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

import { Swipe, SwipeItem ,Lazyload,Field,Button,NavBar,Icon,Search} from 'vant';
Vue.use(Swipe).use(SwipeItem);
Vue.use(Field).use(Button).use(NavBar).use(Icon).use(Search);
Vue.use(Lazyload,{
  loading:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552019516928&di=e491b417ae269411e1e1b9c44458f865&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ff7ac746763dd804babdfb49e5563c09836c06137626ad-hOMCBS_fw658"
})
const API = require('../config/api')
window.API = API

// store.dispatch('GET_SHOPLIST').then(()=>{
//   console.log(store.state.shoplist)

// })

Vue.config.productionTip = false
Vue.directive('rainbow',{
  bind(el,binding,vnode){
        el.style.color = "#" + Math.random().toString(16).slice(2,8);
  }
})

import axios from 'axios'
// axios全局配置
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//使用store
  components: { App },
  template: '<App/>'
})
