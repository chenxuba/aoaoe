<template>
  <div>
    <div class="faxian">
      <div class="left">
        <div class="img1" v-for="(item,index) in list" :key="index">
          <img v-lazy="item.url" alt width="100%" height="100%">
        </div>
      </div>
      <div class="right">
        <div class="img2" v-for="(item,index) in list1" :key="index">
          <img v-lazy="item.url" alt width="100%" height="100%">
        </div>
      </div>
    </div>
    <div class="faxian">
      <div class="left">
        <div class="img1" v-for="(item,index) in list2" :key="index">
          <img v-lazy="item.url" alt width="100%" height="100%">
        </div>
      </div>
      <div class="right">
        <div class="img2" v-for="(item,index) in list3" :key="index">
          <img v-lazy="item.url" alt width="100%" height="100%">
        </div>
      </div>
    </div>
    <div class="faxian">
      <div class="left">
        <div class="img1" v-for="(item,index) in list4" :key="index">
          <img v-lazy="item.url" alt width="100%" height="100%">
        </div>
      </div>
      <div class="right">
        <div class="img2" v-for="(item,index) in list5" :key="index">
          <img v-lazy="item.url" alt width="100%" height="100%">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      list5: [],
    };
  },
  mounted() {
    this.$http
      .get("https://gank.io/api/data/%E7%A6%8F%E5%88%A9/10/1")
      .then(result => {
        console.log(result);
        this.list = result.data.results;
      })
      .catch(err => {});
    this.$http
      .get("https://gank.io/api/data/%E7%A6%8F%E5%88%A9/10/2")
      .then(res => {
        // console.log(result)
        this.list1 = res.data.results;
      })
      .catch(err => {});
      this.$http
      .get("https://gank.io/api/data/%E7%A6%8F%E5%88%A9/10/3")
      .then(res => {
        // console.log(result)
        this.list2 = res.data.results;
      })
      .catch(err => {});
      this.$http
      .get("https://gank.io/api/data/%E7%A6%8F%E5%88%A9/10/4")
      .then(res => {
        // console.log(result)
        this.list3 = res.data.results;
      })
      .catch(err => {});
      this.$http
      .get("https://gank.io/api/data/%E7%A6%8F%E5%88%A9/10/5")
      .then(res => {
        // console.log(result)
        this.list4 = res.data.results;
      })
      .catch(err => {});
      this.$http
      .get("https://gank.io/api/data/%E7%A6%8F%E5%88%A9/10/6")
      .then(res => {
        // console.log(result)
        this.list5 = res.data.results;
      })
      .catch(err => {});
  }
};
</script>

<style lang="less" scoped>
.faxian {
  width: 100%;
  height: 100%;
  padding-bottom: 88px;
  display: flex;
  .left {
    width: 50%;
    height: 100%;
    // background-color: red;
    .img1 {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      // height: 500px;
    }
  }
  .right {
    width: 50%;
    height: 100%;
    // background-color: orange;
    .img2 {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;

      // height: 520px;
    }
  }
}
</style>

