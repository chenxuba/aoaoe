<template>
  <div id="app">
    <!--底部导航开始-->
    <div class="nav1" v-show="$route.meta.showFooter">
      <router-link active-class="active" to="/index">
        <van-icon name="logistics" class="icon"/>
        <span>外卖</span>
      </router-link>
      <router-link active-class="active" to="/faxian">
        <van-icon name="flower-o" class="icon"/>
        <span>发现</span>
      </router-link>
      <router-link active-class="active" to="/dingdan">
        <van-icon name="records" class="icon"/>
        <span>订单</span>
      </router-link>
      <router-link active-class="active" :to="userInfo?'/profile':'/login'">
        <van-icon name="user-o" class="icon"/>
        <span>{{userInfo?'我的':'未登录'}}</span>
      </router-link>
    </div>
    <!--底部导航结束-->
    <router-view/>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapState(["userInfo"])
  },
  mounted () {
    this.getLocation();
  },
  methods: {
    getLocation() {
     const self = this;
      AMap.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
         
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // data是具体的定位信息
          console.log(data)
          // localStorage.setItem("")
           self.$store.dispatch("setLocation",data);
           self.$store.dispatch("setAddress",data.formattedAddress);
        }

        function onError(data) {
          // 定位出错
          console.log(data)
        }
      });
    }
  }
};
document.addEventListener("DOMContentLoaded", setFontSize);

window.addEventListener("resize", setFontSize);

function setFontSize() {
  const html = document.querySelector("html");

  let fontSize = window.innerWidth / 10;

  fontSize = fontSize > 65 ? 65 : fontSize;

  html.style.fontSize = fontSize + "px";
}
</script>

<style lang="less">
html,body,#app{
  width: 100%;
  height: 100%;
}
.nav1 {
  width: 100%;
  height: 92px;
  line-height: 42px;
  text-align: center;
  display: flex;
  position: fixed;
  bottom: 0;
  background: #fff;
  border-top: 1px solid #777;
  z-index: 99;
  padding-top: 10px;
  box-sizing: border-box;
  a {
    flex: 1;
    text-decoration: none;
    color: #a3aaaf;
    .icon {
      display: block;
      font-size: 45px;
    }
  }
  a.active {
    color: #0099ff;
  }
}
#app {
  overflow-x: hidden;
}
</style>

