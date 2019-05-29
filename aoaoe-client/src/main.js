// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'   //引入store
import 'lib-flexible/flexible' //px转rem配置

import infiniteScroll from 'vue-infinite-scroll'  //上拉加载插件
Vue.use(infiniteScroll)

//mint-ui按需引入
import { Indicator } from 'mint-ui'
import 'mint-ui/lib/style.css'
import { Swipe, SwipeItem ,Lazyload,Field,Button,NavBar,Icon,Search,Loading} from 'vant';
Vue.use(Swipe).use(SwipeItem);
Vue.use(Field).use(Button).use(NavBar).use(Icon).use(Search).use(Loading);
Vue.use(Lazyload,{
  loading:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552019516928&di=e491b417ae269411e1e1b9c44458f865&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ff7ac746763dd804babdfb49e5563c09836c06137626ad-hOMCBS_fw658"
})
const API = require('../config/api')
window.API = API

// store.dispatch('GET_SHOPLIST').then(()=>{
//   console.log(store.state.shoplist)

// })

router.afterEach((to, from, next) => {

  window.scrollTo(0, 0);

})

Vue.config.productionTip = false
Vue.directive('rainbow',{
  bind(el,binding,vnode){
        el.style.color = "#" + Math.random().toString(16).slice(2,8);
  }
})

import axios from 'axios'
// axios全局配置
Vue.prototype.$http = axios
//请求拦截
axios.interceptors.request.use(config =>{
  //加载动画
  Indicator.open("加载中");
  return config;
},error =>{
  return Promise.reject(error)
});
//响应拦截
axios.interceptors.response.use(response =>{
  setTimeout(()=>{
    Indicator.close();
  },500)
  
  return response;
},error =>{
  Indicator.close();
  return Promise.reject(error)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//使用store
  components: { App },
  template: '<App/>'
})
