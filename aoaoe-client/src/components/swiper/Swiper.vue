<template>
  <div class="swiper">
    <ul class="list" v-if="menu.length">
      <li v-for="(item,index) in menu" :key="index">
        <img :src="item.img_url">
        <span>{{item.title}}</span>
      </li>
    </ul>
    <img src="./img/menu.svg" alt="back" v-else>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'; //新加
export default {
  data() {
    return { //axios
      menu: []
    };
  },
  mounted () {
    //this.getSwiper();//请求分类列表
    this.getmenu().then(() => {
      this.menu = this.menulist
    })
  },
  methods: {
    // getSwiper(){
    //   this.$http("http://www.chenruisheng.info/aoaoe/api/menu").then((res) => {
    //     this.swiper = res.data;
    //     console.log(this.swiper)
    //   }).catch((err) => {
        
    //   });
    // },
    ...mapActions({  //新加
      getmenu:'GET_MENU'
    })
  },
  computed: {
    ...mapState({  //新加
      menulist:state => state.menulist
    })
  }
};
</script>

<style scoped lang="less">
/* swiper样式 */
.swiper {
  width: 100%;
  height: 340px;
  padding-bottom: 40px;
  .list {
    overflow: hidden;
    zoom: 1;
    li {
      width: 25%;
      float: left;
      text-align: center;
      padding-top: 28px;
      span {
        display: block;
        text-align: center;
        font-size: 28px;
        line-height: 28px;
        color: #776f6f;
      }
      img {
        width: 90px;
        height: 90px;
        margin-bottom: 24px;
      }
    }
  }
}
</style>
