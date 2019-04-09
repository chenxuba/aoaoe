import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './http'

import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import moment from 'moment/moment'
Vue.filter('time', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm';
  return moment(value).format(formatString);
})
Vue.use(VueQuillEditor)
//自定义指令
Vue.directive('rainbow',{
  bind(el,binding,vnode){
        el.style.color = "#" + Math.random().toString(16).slice(2,8);
  }
})

import vuePicturePreview from 'vue-picture-preview'
Vue.use(vuePicturePreview)  //预览图片插件

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
