<template>
  <div class="header">
    <!-- 顶部通栏开始 -->
    <div class="top-wrapper">
      <div class="back-wrapper" @click="goback">
        <span class="icon-arrow_lift"></span>
      </div>

      <form class="search-wrapper">
        <span class="search-icon"></span>
        <input class="search-bar" type="text" placeholder="搜索店内商品">
      </form>

      <div class="more-wrapper">
        <a class="spelling-bt" href="#">拼单</a>
        <div class="more-bt">
          <i class="s-radius"></i>
          <i class="s-radius"></i>
          <i class="s-radius"></i>
        </div>
      </div>
    </div>
    <!-- 顶部通栏结束 -->
    <!-- 主题内容开始 -->
    <div class="content-wrapper">
      <div class="icon">
        <img :src="poilist.pic_url">
      </div>
      <div class="name">
        <h3>{{poilist.name}}</h3>
      </div>
      <div class="collect" @click="collect">
        <img src="./img/star.png" v-show="downIcon">
        <img src="./img/timg.png" v-show="!downIcon">
        <span>收藏</span>
      </div>
    </div>

    <!-- 主题内容结束 -->
    <!-- 公告内容开始 -->
    <div class="bulletin-wrapper">
      <img class="icon" v-if="poilist.discounts" :src="poilist.discounts[0].icon_url">
      
      <span class="text" v-if="poilist.discounts">{{poilist.discounts[0].info}}</span>
      <div class="detail" v-if="poilist.discounts" @click="showBulletin">
        {{poilist.discounts.length}}个活动
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <!-- 公告内容结束 -->
    <!-- 背景内容开始 -->
    <div class="bg-wrapper" :style="head_pic">
      <!-- <img :src="poilist.head_pic_url" /> -->
    </div>
    <!-- 背景内容结束 -->
    <!-- 公告详情开始 -->
    <transition name="bulletin-detail">
      <div class="bulletin-detail" v-show="isShow">
        <div class="detail-wrapper">
          <!-- 相关内容容器 -->
          <div class="main-wrapper" :style="detail_bg">
            <div class="icon">
              <img :src="poilist.pic_url">
            </div>
            <h3 class="name">{{poilist.name}}</h3>
            <!-- 星级评价 -->
            <div class="score">
              <app-star :score="poilist.wm_poi_score"></app-star>
              <span>{{poilist.wm_poi_score}}分</span>
            </div>

            <p class="tip">
              起送¥{{poilist.min_price_tip}}
              <i>|</i>
              配送¥{{poilist.shipping_fee_tip}}
              <i>|</i>
              人均¥{{poilist.mt_delivery_time}}
            </p>

            <p class="time">配送时间: {{poilist.shipping_time_x}}</p>

            <div class="discounts" v-if="poilist.discounts">
              <p v-for="(ok,index) in poilist.discounts" :key="index">
                <img :src="ok.icon_url">
                <span>{{ok.info}}</span>
              </p>
            </div>
          </div>

          <!-- 关闭内容容器 -->
          <div class="close-wrapper">
            <span class="icon-close" @click="closeBulletin"></span>
          </div>
        </div>
      </div>
    </transition>
    <!-- 公告详情结束 -->
  </div>
</template>

<script>
import Star from "../star/Star";

export default {
  data() {
    return {
      downIcon: true,
      isShow: false
    };
  },
  props: {
    poilist: {
      type: Object,
      default: {
        function() {
          return {};
        }
      }
    }
  },
  computed: {
    detail_bg() {
      return "background-image: url(" + this.poilist.poi_back_pic_url + ")";
    },
    head_pic() {
      return "background-image: url(" + this.poilist.head_pic_url + ")";
    }
  },
  methods: {
    collect() {
      this.downIcon = !this.downIcon; //控制收藏按钮
    },
    closeBulletin() {
      this.isShow = false;
    },
    showBulletin() {
      this.isShow = true;
    },
    goback() {
      this.$router.push("/index");
    }
  },
  components: {
    "app-star": Star
  }
};
</script>

<style scoped lang="less">
@import url(../../common/css/icon.css);

.header {
  height: 280px;
  padding-top: 80px;
  .bg-wrapper {
    width: 100%;
    height: 355px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    background-size: 100% 100%;
  }
  .top-wrapper {
    position: relative;
    .back-wrapper {
      width: 100px;
      height: 62px;
      position: absolute;
      left: 0;
      top: 0;
      text-align: center;
      line-height: 62px;
      span {
        display: inline-block;
        color: white;
      }
    }
    .search-wrapper {
      width: 100%;
      height: 62px;
      padding: 0 208px 0 100px;
      box-sizing: border-box;
      .search-icon {
        width: 56px;
        height: 62px;
        background: url(./img/search.png) no-repeat 11px center;
        background-size: 26px 26px;
        position: absolute;
      }
      .search-bar {
        width: 100%;
        height: 62px;
        border: 0;
        box-sizing: border-box;
        background: #f5f5f9;
        border-radius: 50px;
        padding-left: 56px;
        outline: none;
        font-size: 26px;
        line-height: normal;
      }
    }
    .more-wrapper {
      width: 130px;
      height: 48px;
      position: absolute;
      right: 0;
      top: 0;
      padding: 14px 30px 0 48px;
      .spelling-bt {
        width: 60px;
        height: 34px;
        color: white;
        line-height: 34px;
        border: 2px solid white;
        text-align: center;
        float: left;
        text-decoration: none;
        font-size: 20px;
      }
      .more-bt {
        float: right;
        width: 40px;
        height: 48px;
        margin-left: 26px;
        margin-top: 12px;
        .s-radius {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          border: 2px solid white;
          display: block;
          float: left;
          margin-right: 2px;
        }
      }
    }
  }
  .content-wrapper {
    padding: 30px 20px 22px;
    height: 100px;
    .icon {
      width: 100px;
      height: 100px;
      border-radius: 10px;
      float: left;
      img {
        width: 110px;
        height: 100px;
        border-radius: 20px;
      }
    }
    .name {
      float: left;
      padding: 36px 0 0 24px;
      h3 {
        font-size: 32px;
        font-weight: bold;
        color: white;
      }
    }
    .collect {
      width: 50px;
      height: 74px;
      float: right;
      text-align: center;
      padding-top: 12px;
      img {
        width: 40px;
        height: 40px;
      }
      span {
        margin-top: 14px;
        color: white;
        font-size: 22px;
      }
    }
  }
  .bulletin-wrapper {
    height: 32px;
    padding: 20px 20px;
    .icon {
      width: 32px;
      height: 32px;
      float: left;
      margin-right: 12px;
    }
    .text {
      font-size: 22px;
      color: white;
      float: left;
      line-height: 32px;
    }
    .detail {
      color: white;
      float: right;
      font-size: 22px;
      line-height: 32px;
      span {
        font-size: 32px;
        line-height: 32px;
        float: right;
      }
    }
  }
  .bulletin-detail {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(98, 98, 98, 0.8);
    z-index: 999;
    .detail-wrapper {
      width: 100%;
      height: 100%;
      padding: 150px 40px 250px;
      box-sizing: border-box;
      .main-wrapper {
        width: 100%;
        height: 100%;
        background-size: 100% 100%;
        border-radius: 20px;
        text-align: center;
        .icon {
          width: 120px;
          height: 120px;
          border-radius: 10px;
          display: inline-block;
          margin-top: 80px;
          img {
            width: 120px;
            height: 120px;
            border-radius: 20px;
          }
        }
        .name {
          font-size: 30px;
          color: white;
          margin-top: 26px;
        }
        .score {
          height: 20px;
          margin-top: 12px;
          text-align: center;
          font-size: 0;
          .star {
            display: inline-block;
            margin-right: 14px;
          }
          span {
            display: inline-block;
            font-size: 20px;
            color: white;
          }
        }
        .tip {
          font-size: 22px;
          color: #bababc;
          margin-top: 16px;
          i {
            margin: 0 14px;
          }
        }
        .time {
          font-size: 22px;
          color: #bababc;
          margin: 26px 30px 0 30px;
          border-bottom: 2px solid #bababc;
          padding: 0 20px 40px 20px;
        }
        .discounts {
          margin-top: 40px;
          padding: 0 40px;
          margin-left: 90px;
          p {
            margin-bottom: 20px;
            text-align: left;
          }
          img {
            width: 32px;
            height: 32px;
            vertical-align: middle;
          }
          span {
            font-size: 22px;
            line-height: 32px;
            color: white;
          }
        }
      }
      .close-wrapper {
        padding-top: 40px;
        height: 80px;
        text-align: center;
        span {
          width: 80px;
          height: 80px;
          line-height: 80px;
          border-radius: 50%;
          font-size: 28px;
          color: white;
          display: inline-block;
          background: rgba(118, 118, 118, 0.7);
          border: 2px solid rgba(140, 140, 140, 0.9);
        }
      }
    }
  }
}
/* 背景图片样式 */
/* 顶部通栏样式开始 */
/* 主题内容 样式 */
/* 公告内容样式 */
/* 动画效果 */
.bulletin-detail-enter-active,
.bulletin-detail-leave-active {
  transition: 0.5s all;
}
.bulletin-detail-enter,
.bulletin-detail-leave-to {
  opacity: 0;
}
.bulletin-detail-enter-to,
.bulletin-detail-leave {
  opacity: 1;
}
/* 公告详情 样式 */
</style>
