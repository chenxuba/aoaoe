<template>
  <el-row class="menu_page">
    <el-col>
      <el-menu
        mode="vertical"
        background-color="#324057"
        text-color="#fff"
        active-text-color="#409eff"
        class="el-menu-vertical-demo"
      >
        <router-link to="/home">
          <el-menu-item index="0">
            <i class="el-icon-star-on"></i>
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>
        <template v-for="item in items">
          <el-submenu v-if="item.children" :index="item.path" :key="item.path">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <router-link v-for="(citem,cindex) in item.children" :to="citem.path" :key="cindex">
              <el-menu-item :index="citem.path">
                <span slot="title">{{citem.name}}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "leftmenu",
  data() {
    return {
      items: [
        {
          icon: "el-icon-location",
          name: "数据管理",
          path: "fund",
          children: [
            { path: "/foundlist", name: "前端店铺列表" },
            { path: "/menulist", name: "食品分类列表" },
            { path: "/foodlist", name: "店铺食品列表" },
            { path: "/dislist", name: "店铺活动列表" },
            { path: "/adminlist", name: "后台用户列表" },
            { path: "/readinglist", name: "前端用户列表" },
            { path: "/menus", name: "店铺分类列表" }
          ]
        },
        {
          icon: "el-icon-location",
          name: "添加数据",
          path: "news", //控制点击
          children: [
            { path: "/androidlist", name: "添加店铺" },
            { path: "/adddiscount", name: "添加活动" }
          ]
        },
        {
          icon: "el-icon-location",
          name: "信息管理",
          path: "info",
          children: [
            { path: "/infoshow", name: "个人信息" },
            { path: "/understand", name: "权限说明" }
          ]
        }
      ]
    };
  }
};
</script>
<style scoped>
.menu_page {
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>
