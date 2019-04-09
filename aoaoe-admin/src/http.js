import axios from 'axios';
import { Message,Loading } from 'element-ui';
import router from './router'

let loading        //定义loading变量
function startLoading() {    //使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        text: '拼命加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}
function endLoading() {    //使用Element loading-close 方法
    loading.close();
}
// ---------------------------------------------------------- //
// 请求拦截
axios.interceptors.request.use(config => {
    // 加载 
    startLoading();
    if(localStorage.eleToken){ 
        //设置统一的请求header
        config.headers.Authorization = localStorage.eleToken;
    }
    return config; 
}, error => {
    return Promise.reject(error)
})
// 响应拦截
axios.interceptors.response.use(response => {
    endLoading()
    return response
}, error => {
    // 错误提醒
    endLoading();
    Message.error(error.response.data);
    //获取错误状态码
    const {status}  = error.response
    // console.log(status)
    if(status == 400){
        Message.error('账号或密码错误')
    }
    if (status == 401) {
        Message.error('登陆过期，请重新登录')
        // 清除token
        localStorage.removeItem('eleToken')

        // 页面跳转
        router.push('/login')
    }
    return Promise.reject(error);   
})
export default axios;