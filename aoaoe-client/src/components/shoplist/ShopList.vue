<template>
  <div class="shop-list">
    <div class="title-bar">
      <span>附近商家</span>
    </div>
    <div v-if="allshop.length">
      <div
        class="shop-list-item"
        v-for="(item,index) in allshop" 
        :key="index"
        @click="showDetail(item._id)"
      >
        <div class="left">
          <img :src="item.pic_url">
        </div>
        <div class="right">
          <div class="name">{{item.name}}</div>
          <div class="mid">
            <!-- 星星评价 开始 -->
            <div class="star">
              <app-star :score="item.wm_poi_score"></app-star>
            </div>
            <!-- 星星评价 开始 -->
            <span class="count">月售{{item.month_sale_num}}</span>
            <span class="distance">{{item.distance}}km</span>
            <span class="time">{{item.mt_delivery_time}}分钟</span>
          </div>
          <div class="fee">
            <span class="start">起送¥{{item.min_price_tip}}</span>
            <span class="delivery">配送¥{{item.shipping_fee_tip}}</span>
            <span class="average">人均¥{{item.average_price_tip}}</span>
          </div>
          <div class="activity" v-for="(icon,index) in item.discounts" :key="index">
            <p>
              <img :src="icon.icon_url">
              {{icon.info}}
            </p>
          </div>
        </div>
      </div>
    </div>
    <ul v-else>
      <li v-for="(item,index) in 6" :key="index">
        <img src="./img/sholist.svg" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
import Star from "../star/Star";
import {mapState,mapActions} from 'vuex'; //新加
export default {
  data() {
    return {
      allshop:[]
    };
  },
  mounted () {
    this.getAllshop().then(() => {
      this.allshop = this.shoplist
    })
  },
  methods: {
    showDetail(id) {
      this.$router.push({ path: "shopdetail/" + id });
    },
    ...mapActions({  //新加
      getAllshop:'GET_SHOPLIST'
    })
  },
  // props: {
  //   allshop: {}
  // },
  components: {
    "app-star": Star
  },
  computed: {
    ...mapState({  //新加
      shoplist:state => state.shoplist
    })
  }
};
</script>

<style scoped lang="less">
/* 附近商家样式 */
.title-bar {
  height: 80px;
  line-height: 80px;
  text-align: center;
  span {
    display: inline-block;
    position: relative;
    font-weight: bold;
    font-size: 30px;
    color: #333;
    &:before {
      content: "";
      position: absolute;
      top: 38px;
      right: -100px;
      width: 80px;
      border-top: 2px solid #333;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
    &:after {
      content: "";
      position: absolute;
      top: 40px;
      left: -100px;
      width: 80px;
      border-top: 2px solid #333;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }
}
.shop-list-item {
  display: flex;
  padding: 40px 0;
  margin-bottom: 5px;
  position: relative;
  .left {
    flex: 0 0 180px;
    img {
      display: block;
      width: 140px;
      height: 124px;
      margin: 0 auto;
    }
  }
  .right {
    flex: 1;
    display: flex;
    padding-right: 30px;
    flex-direction: column;
    .name {
      font-size: 32px;
      color: #333;
      font-weight: bold;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .mid {
      flex: 1;
      font-size: 24px;
      color: #666;
      margin-top: 20px;
      .star {
        width: 140px;
        height: 28px;
        float: left;
      }
      .count {
        float: left;
        margin-left: 20px;
      }
      .time {
        margin-right: 20px;
        float: right;
        position: relative;
        &:after {
          position: absolute;
          content: "";
          top: -2px;
          right: -16px;
          height: 30px;
          border-right: 1.1px solid #999;
          -webkit-transform: scaleY(0.5);
          transform: scaleY(0.5);
        }
      }
      .distance {
        margin-left: 10px;
        float: right;
        margin-right: 50px;
      }
    }
    .fee {
      flex: 1;
      font-size: 26px;
      margin-top: 20px;
      .start {
        margin-right: 20px;
        position: relative;
        &:after {
          position: absolute;
          content: "";
          top: 0px;
          right: -16px;
          height: 30px;
          border-right: 1.1px solid #999;
          -webkit-transform: scaleY(0.5);
          transform: scaleY(0.5);
        }
      }
      .delivery {
        margin-right: 20px;
        position: relative;
        &:after {
          position: absolute;
          content: "";
          top: 0px;
          right: -16px;
          height: 30px;
          border-right: 1.1px solid #999;
          -webkit-transform: scaleY(0.5);
          transform: scaleY(0.5);
        }
      }
      span {
        display: inline-block;
        color: #656565;
      }
    }
    .activity {
      flex: 1;
      font-size: 26px;
      color: #b0b0b0;
      margin-top: 20px;
      p {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 600px;
      }
      img {
        width: 32px;
        height: 32px;
        margin-right: 10px;
        vertical-align: bottom;
      }
    }
  }
  &:after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 2px solid rgba(7, 17, 27, 0.1);
    transform: scaleY(0.5);
  }
  &:last-child {
    margin-bottom: 96px;
  }
}
</style>
