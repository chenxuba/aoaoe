<template>
  <div class="address">
    <div class="top">
      <div class="header">
        <van-nav-bar title="选择收获地址" left-text="返回" left-arrow @click-left="$router.go(-1)"/>
      </div>
      <van-search placeholder="请输入搜索关键词" v-model="value" :label="city"/>
      <div class="nowLocation">
        <h1 class="title">当前定位:</h1>
        <div class="location">
          <van-icon name="location-o" class="icon"/>
          {{address || "正在定位,请稍后..."}}
        </div>
      </div>
    </div>
    <div class="list-box">
      <ul v-for="(item,index) in search_list" :key="index">
        <li @click="selectAddress(item)">
          <h4>{{item.name}}</h4>
          <p>{{item.district}}{{item.address}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      city: this.$route.query.city,
      search_list: []
    };
  },
  //  beforeRouteEnter(to,from,next){
  //      console.log(to)
  //      next(vm =>{
  //          vm.city = to.query.city;
  //      })
  //  }
  watch: {
    value() {
      this.searchPlace(); //监听关键词的变化
    }
  },
  methods: {
    searchPlace() {
      const self = this;
      AMap.plugin("AMap.Autocomplete", function() {
        // 实例化Autocomplete
        var autoOptions = {
          //city 限定城市，默认全国
          city: self.city
        };
        var autoComplete = new AMap.Autocomplete(autoOptions);
        autoComplete.search(self.value, function(status, result) {
          // 搜索成功时，result即是对应的匹配数据
          self.search_list = result.tips;
        });
      });
    },
    selectAddress(item) {
      //设置地址
      this.$store.dispatch(
        "setAddress",
        item.district + item.address + item.name
      );
      this.$router.push("/index");
    }
  },
  computed: {
    address() {
      return this.$store.getters.location.formattedAddress;
    }
  }
};
</script>

<style lang="less" scoped>
.address {
  width: 100%;
  height: 100%;
  background-color: #f3f3f3;
  .top {
    width: 100%;
    background-color: #fff;
    .header {
      width: 100%;
      .van-nav-bar {
        background-color: #0299ff;
        div {
          color: #fff;
        }
        i {
          color: #fff;
        }
        span {
          color: #fff;
        }
      }
    }
    .nowLocation {
      width: 100%;
      height: 100px;
      // background-color: red;
      padding: 0 50px;
      box-sizing: border-box;
      .title {
        font-size: 30px;
      }
      .location {
        padding: 20px 0;
        font-size: 28px;
        line-height: 30px;
        width: 95%;
        height: 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        .icon {
          color: rgb(0, 175, 245);
          // background-color: #0299ff;
          vertical-align: middle;
        }
      }
    }
  }
  .list-box {
    margin-top: 32px;
    background-color: #fff;
    li {
      border-bottom: 2px solid #eee;
      padding: 16px 32px;
      color: #aaa;
      font-size: 30px;
      h4 {
        font-weight: bold;
        color: #333;
        margin-bottom: 5px;
      }
      p {
        margin-top: 20px;
      }
    }
  }
}
</style>

