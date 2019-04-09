<template>
    <transition name="food-detail">
    <div class="fooddetail" v-show="flag" ref="foodView">
    <div class="food">
        <div class="fooddetail-img">
           <img :src="food.picture" alt="">
           <div class="btn" @click="black">x</div>
       </div>
       <div class="fooddetail-info">
           <div class="fooddetail-name">
               <p class="name">{{food.name}}</p>
           </div>
           <div class="fooddetail-good">
               <span class="saled">{{food.month_saled_content}}</span>
               <span class="praise">{{food.praise_content}}</span>
           </div>
           <div class="fooddetail-price">
               <span>¥{{food.min_price}}</span>
           </div>
           <div class="cartcontrol-wrapper">
              <app-cart-control :food="food"></app-cart-control>
            </div>
            
       </div>
       <div class="pingjia">
       我手机京津冀
       我手机京津冀
       我手机京津冀
       我手机京津冀
       我手机京津冀
       我手机京津冀
       我手机京津冀
       我手机京津冀
       我手机京津冀
       我手机京津冀
       我手机京津冀
       我手机京津冀
       我手机京津冀
       我手机京津冀
       我手机京津冀

       </div>
     </div>
    
    
    </div>
    </transition>
</template>

<script>
import Cartcontrol from "../cartcontrol/Cartcontrol";
import BScroll from "better-scroll";

export default {
    props:{
        food:{
            
        }
    },
    data(){
        return{
            flag:false
        }
    },
    methods:{
        childMethods(){
            this.flag = true
            this.$nextTick(()=>{
                if(!this.scroll){
                    this.scroll = new BScroll(this.$refs.foodView,{
                        click:true
                    })
                }else{
                    this.scroll.refresh()
                }
            })
        },
        black(){
            this.flag = false

        }
    },
    components:{
        "app-cart-control": Cartcontrol,
    }
}
</script>

<style>
.food-detail-enter-active, .food-detail-leave-active {
  transition:  0.5s
}
.food-detail-enter, .food-detail-leave-to {
  transform: translateX(100%);
}
.fooddetail{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 51px;
    background-color: #fff;
}

.fooddetail-img img{
    position: absolute;
    top: 0;
    width: 100%;
    /* height: 100%; */
}
.fooddetail-img{
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
    /* background-color: orange; */
}
.fooddetail-img .btn{
    position: absolute;
    width: 30px;
    height: 30px;
    background-color: #ccc;
    color: #fff;
    text-align: center;
    border-radius: 50%;
    font-size: 26px;
    line-height: 26px;
    top: 10px;
    right: 10px;
}
.fooddetail-info{
    width: 100%;
    height: 120px;
    box-sizing: border-box;
    padding: 0 15px;
    /* background-color: red; */
    position: relative;
    
}
.fooddetail-info .cartcontrol-wrapper{
    position: absolute;
    top: 84px;
    right: 15px;
}
.fooddetail-info .fooddetail-name{
    font-size: 24px;
    padding: 20px 0 15px 0;
}
.fooddetail-info .fooddetail-good{
    font-size: 13px;
    color: #666;
    margin-bottom: 15px;
}
.fooddetail-info .fooddetail-price{
    color:red;
    font-size: 18px;
}
.pingjia{
   opacity: 0;
}
</style>
