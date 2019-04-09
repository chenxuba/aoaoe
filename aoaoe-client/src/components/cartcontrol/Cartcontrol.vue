<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease  icon-remove_circle_outline" @click.stop.prevent="decreaseCart" v-show="food.count"></div>
    </transition>
      <div class="cart-count" v-show="food.count">{{food.count}}</div>
      <div class="cart-add icon-add_circle" @click.stop.prevent="increaseCart">
        <i class="bg"></i>
      </div>
    
  </div>
</template>

<script>
  import Vue from "vue";

  export default {
    props: {
      food: {
        
      }
    },
    methods: {
      decreaseCart() {
        if(this.food.count<=0){
          this.food.count == 1
        }else{
          this.food.count--;
        }
        
      },
      increaseCart() {
        if (!this.food.count) {
          Vue.set(this.food, "count", 1);
        } else {
          this.food.count++;
        }
      }
    }
  };

</script>

<style scoped>
@import url(../../common/css/icon.css);

  .cartcontrol {
    font-size: 0;
  }

  .cartcontrol .cart-decrease {
    display: inline-block;
    width: 52px;
    height: 52px;
    font-size: 52px;
    color: #b4b4b4;
  }

  .cartcontrol .cart-add .bg {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: black;
    position: absolute;
    left: 6px;
    top: 5px;
    z-index: -1;
  }

  .cartcontrol .cart-count {
    display: inline-block;
    width: 50px;
    text-align: center;
    font-size: 24px;
    line-height: 52px;
    vertical-align: top;
  }

  .cartcontrol .cart-add {
    display: inline-block;
    width: 52px;
    height: 52px;
    font-size: 52px;
    color: #ffd161;
    position: relative;
  }

.move-enter-active,.move-leave-active{
	transition: all 0.5s linear;
}
.move-enter,.move-leave-to{
	transform: translateX(40px) rotate(180deg);
}
</style>
