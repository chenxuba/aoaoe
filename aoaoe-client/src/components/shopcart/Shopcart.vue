<template>
  <div class="shopcart">
    <div class="shopcart-wrapper">
      <!-- 底部左侧 -->
      <div class="content-left">
        <div class="logo-wrapper" :class="{'highligh':totalCount>0}">
          <span
            class="icon-shopping_cart logo"
            :class="{'highligh':totalCount>0}"
            @click="toggleList"
          ></span>
          <i v-show="totalCount" class="num">{{totalCount}}</i>
        </div>
        <div class="desc-wrapper">
          <p v-show="totalPrice" class="total-price">¥ {{totalPrice}}</p>
          <p class="tip" :class="{'highligh':totalCount>0}">另需配送¥{{poilist.shipping_fee_tip}}</p>
        </div>
      </div>
      <!-- 底部右侧 -->
      <div class="content-right" :class="{'highligh':totalCount>0}">{{payStr}}</div>
      <!-- 购物车列表 -->
      <div class="shopcart-list" v-show="listShow" :class="{'show':listShow}">
        <div class="list-top" v-if="poilist.discounts">{{poilist.discounts[0].info}}</div>
        <div class="list-header">
          <h3 class="title">1号口袋</h3>
          <div class="empty" @click="clearAll">
            <img src="./img/ash_bin.png">
            <span>清空购物车</span>
          </div>
        </div>
        <div class="list-content" ref="shopScroll">
          <ul>
            <li class="food-item" v-for="(food,index) in selectFoods" :key="index">
              <div class="desc-wrapper">
                <div class="desc-left">
                  <p class="name">{{food.name}}</p>
                  <p class="unit" v-if="!food.description">{{food.unit}}</p>
                  <p class="description" v-if="food.description">{{food.description}}</p>
                </div>
                <div class="desc-right">¥{{food.min_price}}</div>
              </div>
              <div class="cartcontrol-wrapper">
                <app-cart-control :food="food"></app-cart-control>
              </div>
            </li>
          </ul>
        </div>
        <div class="list-bottom"></div>
      </div>
    </div>
    <div class="shopcart-mask" v-show="listShow" @click="hideMask"></div>
  </div>
</template>

<script>
import Cartcontrol from "../cartcontrol/Cartcontrol";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      fold: true
    };
  },
  props: {
    poilist: {
      type: Object,
      default: {}
    },
    selectFoods: {
      //用来接收父组件传递过来的selectFoods
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    toggleList() {
      //判断购物车是否为空
      if(!this.totalCount){
        return;
      }
      this.fold = !this.fold
    },
     clearAll(){
      this.selectFoods.forEach((food,index)=>{
        food.count = 0
      })
    },
    hideMask(){
      this.fold = true;
    },
  },
  computed: {
    totalCount() {
      let num = 0;
      this.selectFoods.forEach(food => {
        num += food.count;
      });
      return num;
    },
    totalPrice() {
      let price = 0;
      this.selectFoods.forEach(food => {
        price += food.min_price * food.count;
      });
      return price;
    },
    payStr() {
      //右侧去结算显示
      if (this.totalCount > 0) {
        return "去结算";
      } else {
        return "起送¥" + this.poilist.min_price_tip;
      }
    },
    listShow() {
      if (!this.totalCount) {
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      if (show) {
        this.$nextTick(() => {
          if (!this.shopScroll) {
            this.shopScroll = new BScroll(this.$refs.shopScroll, {
              click: true
            });
          } else {
            this.shopScroll.refresh();
          }
        });
      }
      return show;
    }
  },
   components:{
    "app-cart-control": Cartcontrol
  }
};
</script>

<style lang="less" scoped>
@import url(../../common/css/icon.css);
/* 左侧样式 */
.shopcart-wrapper {
  width: 100%;
  height: 102px;
  background: #514f4f;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  z-index: 99;
  .content-left {
    flex: 1;
    .logo-wrapper {
      width: 100px;
      height: 100px;
      background: #666;
      border-radius: 50%;
      position: relative;
      top: -28px;
      left: 10px;
      text-align: center;
      float: left;
      .logo {
        font-size: 56px;
        color: #c4c4c4;
        line-height: 100px;
        &.highligh {
          color: #2d2b2a;
        }
      }
      .num {
        width: 40px;
        height: 40px;
        line-height: 40px;
        border-radius: 50%;
        font-size: 26px;
        color: white;
        background: red;
        position: absolute;
        right: 0;
        top: 0;
      }
      &.highligh {
        background: #ffd161;
      }
    }
    .desc-wrapper {
      float: left;
      margin-left: 38px;
      .tip {
        font-size: 28px;
        color: #bab9b9;
        line-height: 102px;
        &.highligh {
          line-height: 40px;
          font-size: 28px;
        }
      }
      .total-price {
        font-size: 36px;
        line-height: 40px;
        margin-top: 18px;
        color: white;
      }
    }
  }
  .content-right {
    flex: 0 0 220px;
    font-size: 30px;
    color: #bab9b9;
    line-height: 102px;
    text-align: center;
    font-weight: bold;
    &.highligh {
      background: #ffd161;
      color: #2d2b2a;
    }
  }
  .shopcart-list {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    &.show {
      transform: translateY(-100%);
    }
    .list-top {
      height: 60px;
      text-align: center;
      font-size: 22px;
      background: #f3e6c6;
      line-height: 60px;
      color: #646158;
    }
    .list-header {
      height: 60px;
      background: #f4f4f4;
      .title {
        float: left;
        border-left: 8px solid #53c123;
        padding-left: 12px;
        line-height: 60px;
        font-size: 24px;
      }
      .empty {
        float: right;
        line-height: 60px;
        margin-right: 20px;
        font-size: 0;
        img {
          height: 28px;
          margin-right: 18px;
          vertical-align: middle;
        }
        span {
          font-size: 24px;
          vertical-align: middle;
        }
      }
    }
    .list-content {
      max-height: 720px;
      overflow: hidden;
      background: white;
      .food-item {
        height: 76px;
        padding: 24px 24px 20px 24px;
        border-bottom: 2px solid #f4f4f4;
        .desc-wrapper {
          float: left;
          width: 480px;
          .desc-left {
            float: left;
            width: 340px;
            .name {
              font-size: 32px;
              margin-bottom: 16px;
              -webkit-line-clamp: 1;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              overflow: hidden;
              height: 32px;
            }
            .unit {
              font-size: 24px;
              color: #b4b4b4;
            }
            .description {
              font-size: 24px;
              color: #b4b4b4;
              overflow: hidden;
              height: 24px;
            }
          }
          .desc-right {
            float: right;
            width: 140px;
            text-align: right;
            line-height: 70px;
            .price {
              font-size: 24px;
              line-height: 76px;
            }
          }
        }
        .cartcontrol-wrapper {
          float: right;
          margin-top: 12px;
        }
      }
    }
  }
}
/* 右侧样式 */
/* 总数量样式 */
/* 总价钱样式 */
/* count大于0的时候所拥有的样式 */
/* 购物车样式 */
.shopcart {
  .shopcart-mask {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 98;
    background: rgba(7, 17, 27, 0.6);
  }
}
</style>

