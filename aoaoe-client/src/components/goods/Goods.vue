<template>
  <div class="goods">
    <!-- 分类列表 -->
    <div class="menu-wrapper" ref="menuScroll">
      <ul>
        <li
          class="menu-item"
          v-for="(item,index) in poilist.classes"
          :key="index"
          :class="{'current':currentIndex === index}"
          @click="selectMenu(index)"
        >
          <p class="text">
            <img class="icon" :src="item.icon" v-if="item.icon">
            {{item.name}}
          </p>
           <i class="num" v-show="alculateCount(item.foods)">
            {{alculateCount(item.foods)}}
          </i>
        </li>
      </ul>
    </div>
    <!-- 商品列表 -->
    <div class="foods-wrapper" ref="foodScroll">
      <ul>
        <li class="food-list food-list-hook" v-for="(item,index) in poilist.classes" :key="index">
          <h3 class="title">{{item.name}}</h3>
          <!-- 具体的商品列表 -->
          <ul>
            <li v-for="(food,index) in item.foods" :key="index" class="food-item">
              <div class="icon" :style="head_bg(food.picture)"></div>
              <div class="content">
                <h3 class="name">{{food.name}}</h3>
                <p class="desc" v-if="food.description">{{food.description}}</p>
                <div class="extra">
                  <span class="saled">月售{{food.month_saled_content}}</span>
                  <span class="praise">赞 👍{{food.praise_content}}</span>
                </div>
                <img
                  :src="food.product_label_picture"
                  class="product"
                  v-if="food.product_label_picture"
                >
                <p class="price">
                  <span class="text">¥{{food.min_price}}</span>
                  <span class="unit">/{{food.unit}}</span>
                </p>
              </div>
              <div class="cartcontrol-wrapper">
                <app-cart-control :food="food" ></app-cart-control>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 购物车 -->
    <app-shopcart :poilist="poilist" :selectFoods="selectFoods"></app-shopcart>
  </div>
</template>

<script>
import Cartcontrol from "../cartcontrol/Cartcontrol";
import Shopcart from "@/components/shopcart/Shopcart";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      menuScroll: {},
      foodScroll: {},
      scrollY: 0, //y轴滚动的初始高度
      listheight: [] //把所有li元素的可视高度进行一个累加，放进一个数组里
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
  methods: {
    head_bg(imgName) {
      return "background-image: url(" + imgName + ")";
    },
    initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuScroll, {
        click: true
      });
      this.foodScroll = new BScroll(this.$refs.foodScroll, {
        click: true,
        probeType: 3 //必须指定probeType为3时，才会派发scroll事件
      });
      //  监听滚动的位置
      //foodScroll 添加监听事件on  监听右侧的滚动事件 滑动触发
      this.foodScroll.on("scroll", pos => {
        //console.log(pos.y) //会打印出y轴坐标，会出现负数以及小数
        //对得到的pos.y 进行取绝对值Math.abs和取整数Math.round,并赋与scrollY
        this.scrollY = Math.abs(Math.round(pos.y));
        //console.log(this.scrollY) //姿势正确的话会得到整数 和 正数
        //我们既然可以拿到scrollY滚动的值，之后呢，我们就可以去通过计算属性，
        //然后呢遍历一下我们刚刚获取到的listHeight的这个数组里面的所有的区间 ，
        //在使用区间跟我们刚刚获取到的这个scrollY滚动的值做对比，
        //如果当前的区间在这个里面的话，那我们就会生成一个 对应的下标，
        //所以在计算属性里做文章，移步 computed
      });
    },
    //计算区间分类高度
    calulateHeight() {
      console.log(1)
      //获取元素
      let foodlist = this.$refs.foodScroll.getElementsByClassName(
        "food-list-hook"
      );
      console.log(2)
      // console.log(foodlist)
      let height = 0; //定义一个height，最顶部的位置，为0
      this.listheight.push(height); //把当前的位置高度push进刚刚定义的数组里去
      console.log(height) 
      //遍历一下刚刚拿到的li元素，即：foodlist
      for (let i = 0; i < foodlist.length; i++) {
        //拿到每一个li元素
      console.log(i)
        let item = foodlist[i];
        //把每一个li元素的可视高度进行一个累加 即:clientHeight
        height += item.clientHeight;
        // console.log(height)
        //这个时候把每一个li的可视高度都放进listHeight数组里
        this.listheight.push(height);
        // console.log(this.listheight);
      }
    },
    selectMenu(index) {
      // console.log(index)
      let foodlist = this.$refs.foodScroll.getElementsByClassName(
        "food-list-hook"
      );
      let element = foodlist[index];
      // console.log(element)
      this.foodScroll.scrollToElement(element, 250); //250是滚动所花费的时间
    },
    alculateCount(foods){
      let count = 0
      foods.forEach((food)=>{
        if(food.count>0){
          count+=food.count
        }
      })
      return count;
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 执行滚动方法
      this.initScroll();
      this.calulateHeight();
    });
  },
  components: {
    "app-shopcart": Shopcart,
    "app-cart-control": Cartcontrol
    // "app-fooddetail": FoodDetail
  },
  computed: {
    currentIndex() {
      //计算listHeight的下标值
      //只要他的下标值和分类列表的下标值一致的话，那个分类就有一个对应选中的样式
      //拿到listHeight具体的下标，先遍历listHeight
      for (let i = 0; i <= this.listheight.length; i++) {
        //获取商品区间的范围 ps:商品区间就是相邻两个商品的之间的高度
        //定义商品1,它的高度为height1
        let height1 = this.listheight[i];
        //定义商品2,它的高度为height2
        let height2 = this.listheight[i + 1];
        //是否在上述区间中
        //ps:用滚动的值scrollY和height1,height2做对比,
        //如果scrollY大于等于height1并且小于height2,
        //就说明 i 在该区间内了,然后就把i返回,即得到下标
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          // console.log(i);
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      //定义一个计算属性来监听数量是否有变化
      let foods = []; //1.定一个foods数组，用来存放点击的商品
      if(!this.poilist.classes){
        return;
      }
      this.poilist.classes.forEach(myfoods => {  //this.poilist.classes为分类和分类下属的商品
      // console.log(this.poilist.classes)
      // console.log(myfoods)
        myfoods.foods.forEach(food => {  //foods 为 商品
          //遍历商品，把点击的商品放进foods数组内
          if (food.count > 0) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  }
};
</script>

<style lang="less" scoped>
.goods {
  display: flex;
  position: absolute;
  top: 450px;
  bottom: 102px;
  width: 100%;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 160px;
    background: #f4f4f4;
    margin-top: 2px;
  }
  .foods-wrapper {
    flex: 1;
  }
  .menu-wrapper {
    .menu-item.current {
      background: #fff;
      font-weight: bold;
      border-left: 4px solid #12b0ee;
    }
    .menu-item {
      padding: 32px 40px 30px 12px;
      border-bottom: 2px solid #e4e4e4;
      position: relative;
      .text {
        font-size: 26px;
        color: #333;
        line-height: 34px;
        vertical-align: middle;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        .icon {
          width: 30px;
          height: 30px;
          vertical-align: middle;
        }
      }
    }
  }
  .foods-wrapper {
    .food-list {
      padding: 22px;
      .title {
        height: 26px;
        font-size: 26px;
        background: url(./img/btn_yellow_highlighted@2x.png) no-repeat left
          center;
        background-size: 4px 20px;
        padding-left: 14px;
        margin-bottom: 24px;
      }
      .food-item {
        display: flex;
        margin-bottom: 50px;
        position: relative;
        .icon {
          flex: 0 0 126px;
          background-position: center;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          margin-right: 22px;
          height: 126px;
        }
        .content {
          flex: 1;
          .name {
            font-size: 32px;
            line-height: 42px;
            color: #333333;
            margin-bottom: 20px;
            padding-right: 54px;
          }
          .desc {
            font-size: 20px;
            line-height: 38px;
            color: #bfbfbf;
            margin-bottom: 16px;
            -webkit-line-clamp: 2;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .extra {
            font-size: 20px;
            color: #bfbfbf;
            margin-bottom: 14px;
            .saled {
              margin-right: 28px;
            }
          }
          .product {
            height: 30px;
            margin-bottom: 12px;
          }
          .price {
            font-size: 0;
            .text {
              font-size: 28px;
              color: #fb4e44;
            }
            .unit {
              font-size: 24px;
              color: #bfbfbf;
            }
          }
        }
        .cartcontrol-wrapper {
          position: absolute;
          bottom: 0;
          right: 0;
        }
      }
    }
  }
  .menu-wrapper {
    .menu-item {
      .num {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        color: white;
        background: red;
        text-align: center;
        font-size: 26px;
        line-height: 30px;
      }
    }
  }
}
</style>

