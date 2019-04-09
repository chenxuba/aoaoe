<template>
    <header class="head-nav">
        <el-row>
            <el-col :span="6" class='logo-container'>
                <img src="http://chenruisheng.info/img/ybc.png" class='logo' alt="">
                <span class='title'>嗷嗷饿在线总后台管理系统</span>
            </el-col>
            <el-col :span='6' class="user">
                <div class="userinfo">
                    <img src="https://www.gravatar.com/avatar/anything?s=200&d=mm" class='avatar' alt="">
                     <div class='welcome'>
                        <p class='name comename'>欢迎</p>
                         <p class='name avatarname'>{{user.name}}{{user.identity}}</p> 
                    </div>
                    <span class='username'>
                        <el-dropdown
                                trigger="click"
                                @command='setDialogInfo'>
                            <span class="el-dropdown-link">
                                <i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command='info'>个人信息</el-dropdown-item>
                                <el-dropdown-item  command='logout'>退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                     </span>
                </div>
            </el-col>

        </el-row>

    </header>
</template>
<script>
export default {
  name: "head-nav",
  computed: {
    user() {
      return this.$store.getters.user;
    }
    
  },
  methods: {
    setDialogInfo(cmditem) {
      if (!cmditem) {
        // console.log("test"); 
        this.$message("菜单选项缺少command属性");
        return;
      }
      switch (cmditem) {
        case "info":
          this.showInfoList();
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    showInfoList() {
      // 个人信息
      this.$router.push("/infoshow");
    },
    logout() {
      this.$confirm('此操作将退出该用户, 是否继续?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        // 清除token
        localStorage.removeItem("eleToken");
        this.$store.dispatch("clearCurrentState");
        // 页面跳转
        this.$router.push("/login");
        this.$message({
            type: 'success',
            message: '退出成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });          
        });
      
    }
  }
};
</script>

<style scoped>
.head-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
}
.logo-container {
  line-height: 60px;
  min-width: 400px;
  margin-left: 20px;
}
.logo {
  height: 50px;
  width: 50px;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
}
.user {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 20px;
}
.el-dropdown {
  color: #fff;
}
</style>
