<template>
  <div class="index">
    <!-- 头部 -->
    <div class="header">
      <div id="dingwei" @click="$router.push({path:'/address',query:{city:city}})">
        <van-icon name="location"/>
        <b>{{address ? address : "正在定位，请稍后..."}}</b>
      </div>
      <div id="login">
        <router-link :to="userInfo ? '/profile':'/login'">{{userInfo?'我的':'登录'}}</router-link>
      </div>
      <div id="search">
        <router-link to="/index">
          <span>
            <van-icon name="search" class="icon"/>搜索嗷嗷饿商家、商品名称
          </span>
        </router-link>
      </div>
    </div>

    <!--swiper区域开始-->
    <app-swiper></app-swiper>
    <!--swiper区域结束-->
    <!--banner区域开始-->
    <div class="autoplay">
      <van-swipe :autoplay="1000" v-if="banner.length">
        <van-swipe-item v-for="(image, index) in banner" :key="index">
          <img v-lazy="image.banner" class="banner">
        </van-swipe-item>
      </van-swipe>
      <img src="../components/shoplist/img/sholist.svg" alt="back" v-else>
    </div>
    <!--banner区域结束-->
    <!--分割线开始-->
    <!-- <app-line></app-line> -->
    <!--分割线结束-->
    <!--商家列表开始-->
    <app-shoplist></app-shoplist>
    <!--商家列表结束-->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Swiper from "@/components/swiper/Swiper"; //引入 Swiper 组件
import Line from "@/components/line/Line"; //引入 Line 组件
import ShopList from "@/components/shoplist/ShopList"; //引入 ShopList 组件
export default {
  name: "index",
  data() {
    return {
      banner: [],
      allshop: []
    };
  },
  mounted() {
    //this.getBanner(); //请求banner列表
    //this.getShoplist(); //请求店铺列表
    // this.getLocation();  // 取得位置
    this.getBanner().then(() => {
      this.banner = this.bannerlist;
    });
  },
  methods: {
    // getBanner() {
    //   this.$http
    //     .get("http://www.chenruisheng.info/aoaoe/api/banner")
    //     .then(res => {
    //       this.images = res.data;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    ...mapActions({
      //新加
      getBanner: "GET_BANNER"
    })
    // getShoplist() {
    //   this.$http
    //     .get("http://www.chenruisheng.info/aoaoe/api/shoplist/all")
    //     .then(res => {
    //       this.allshop = res.data;
    //       // console.log(this.allshop);
    //     })
    //     .catch(err => {});
    // },
  },
  components: {
    "app-line": Line,
    "app-shoplist": ShopList,
    "app-swiper": Swiper
  },
  computed: {
    ...mapState(["userInfo"]),
    ...mapState({
      bannerlist: state => state.bannerlist
    }),
    address() {
      // return this.$store.getters.address.indexOf('市');
      const str = this.$store.getters.address;
      var pos = str.indexOf("市");
      var address = str.substring(pos + 1, str.length);
      return address;
    },
    city() {
      return (
        this.$store.getters.location.addressComponent.province ||
        this.$store.getters.location.addressComponent.city
      );
    }
  }
};
</script>
<style lang="less" scoped>
.index {
  width: 100%;
  // height: 100%;
  .banner {
    width: 100%;
    height: 180px;
  }
  /* 头部 */
  .header {
    background-color: #0099ff;
    padding: 0 20px;
    box-sizing: border-box;
  }

  #dingwei {
    float: left;
    height: 120px;
    line-height: 120px;
    color: #fff;
    font-size: 28px;
    width: 50%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    i {
      position: relative;
      top: 2px;
    }
    b {
      width: 200px;
      height: 40px;
    }
  }

  #login {
    float: right;
    display: block;
    height: 120px;
    line-height: 120px;
  }

  #login a {
    color: #fff;
    text-decoration: none;
    font-size: 28px;
  }

  #search a {
    display: inline-block;
    width: 100%;
    background-color: #fff;
    height: 88px;
    color: #999;
    font-size: 28px;
    margin-bottom: 40px;
    text-decoration: none;
  }

  #search a span {
    display: block;
    line-height: 88px;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon {
      font-size: 34px;
      display: inline-block;
      margin-right: 16px;
      // color: #09f;
    }
  }
}
</style>
