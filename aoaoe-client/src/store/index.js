import Vue from 'vue';
import Vuex from 'vuex';
import { resolve } from 'path';
import { rejects } from 'assert';
import axios from 'axios'

Vue.use(Vuex);
// const RECEVE_USER_INFO = 'receve_user_info'
const types = {
  SET_LOCATION: "SET_LOCATION",
  SET_ADDRESS: "SET_ADDRESS"
}
const state = { // 需要维护的状态
  userInfo: JSON.parse(localStorage.getItem('userInfo')), //用户信息
  shoplist: [],// 1. 先定义一个容器
  menulist: [],//分类容器
  bannerlist: [],//轮播图容器
  // detail:[],//某个店铺信息容器
  location: {},
  address: ""
}



const mutations = {
  SAVE_USERINFO(state, userInfo) {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    state.userInfo = userInfo
  },
  GET_SHOPLIST(state, shoplist) { //2.在定义一个方法GET_SHOPLIST
    state.shoplist = shoplist
  },
  GET_MENU(state, menulist) {
    state.menulist = menulist
  },
  GET_BANNER(state, bannerlist) {
    state.bannerlist = bannerlist
  },
  // GET_SHOPDETAIL(state,detail){
  //   state.detail = detail
  // }
  [types.SET_LOCATION](state, location) {
    if (location) {
      state.location = location
    }
    else {
      state.location = null
    }
  },
  [types.SET_ADDRESS](state, address) {
    if (location) {
      state.address = address
    }
    else {
      state.address = ""
    }
  }
}

const getters = {
  location: state => state.location,
  address: state => state.address,
}

const actions = { //请求数据在这里
  GET_SHOPLIST({ commit }) {
    return new Promise((resolve, rejects) => {
      axios.get(API.API_SHOPLIST).then((result) => {
        commit('GET_SHOPLIST', result.data);
        resolve(); //3.然后在请求ajax，触发2中的方法
      })
    })
  },
  GET_MENU({ commit }) {
    return new Promise((resolve, rejects) => {
      axios.get(API.API_MENU).then((result) => {
        commit('GET_MENU', result.data);
        resolve(); //3.然后在请求ajax，触发2中的方法
      })
    })
  },
  GET_BANNER({ commit }) {
    return new Promise((resolve, rejects) => {
      axios.get(API.API_BANNER).then((result) => {
        commit('GET_BANNER', result.data);
        resolve(); //3.然后在请求ajax，触发2中的方法
      })
    })
  },
  // GET_SHOPDETAIL({commit}){
  //   return new Promise((resolve,rejects)=>{
  //     axios.get()
  //   })
  // }
  setLocation:({commit},location)=>{
    commit(types.SET_LOCATION,location);
  },
  setAddress:({commit},address)=>{
    commit(types.SET_ADDRESS,address);
  },
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
