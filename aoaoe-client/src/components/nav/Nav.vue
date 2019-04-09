<template>
  <div class="nav">
    <router-link class="nav-item" active-class="active" :to="'/shopdetail/'+id+'/goods'">
      点菜
      <i class="line"></i>
    </router-link>
    <router-link class="nav-item" active-class="active" :to="'/shopdetail/'+id+'/ratings'">
      评价
      <i class="line"></i>
    </router-link>
    <router-link class="nav-item" active-class="active" :to="'/shopdetail/'+id+'/seller'">
      商家
      <i class="line"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: this.$route.params.id,
    }
  },
  props: {
    poilist: {
      type: Object,
      default: {}
    }
  }
};
</script>

<style scoped lang="less">
.nav {
  display: flex;
  width: 100%;
  height: 90px;
  line-height: 90px;
  border-bottom: 2px solid #e4e4e4;
  .active {
    color: #ffbb22;
    .line {
      width: 40px;
      height: 4px;
      display: inline-block;
      background: #ffbb22;
      position: absolute;
      left: 50%;
      bottom: 10px;
      margin-left: -20px;
    }
  }
}
.nav-item {
  flex: 1;
  text-align: center;
  text-decoration: none;
  color: #666666;
  position: relative;
  font-size: 30px;
}

</style>
