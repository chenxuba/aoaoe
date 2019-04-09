<template>
  <div class="detail">
    <!-- 头部 -->
    <app-header :poilist="detail"></app-header>
    <!-- 导航部分 -->
    <app-nav :poilist="detail"></app-nav>
    <keep-alive>
      <router-view :poilist="detail"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Header from "@/components/header/Header";
import Nav from "@/components/nav/Nav";
export default {
  name: "detail",
  data() {
    return {
      id: this.$route.params.id,
      detail: {}, //每个店铺的具体信息包括商品分类和列表
      classAndfood: []
    };
  },
  mounted() {
    this.getShopdetails(); //请求店铺详情
  },
  methods: {
    getShopdetails() {
      this.$http
        .get(process.env.API_HOST + `/api/shop/allmsg/${this.id}`)
        .then(res => {
          this.detail = res.data[0];
          // console.log(this.detail);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  components: {
    "app-header": Header,
    "app-nav": Nav
  }
};
</script>

<style lang="less" scoped>
.detail {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 99;
}
</style>

