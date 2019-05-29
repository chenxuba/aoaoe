<template>
  <div class="userinfo">
    <header>
      <div class="left" @click="$router.go(-1)">
        <van-icon name="arrow-left" class="i"/>
      </div>
      <div class="center">账户信息</div>
      <div class="right"></div>
    </header>
    <div class="sidebar-container">
      <div class="sidebar-overlay">
        <nav>
          <ul>
            <li>
              <router-link to="#">
                <span class="username">头像</span>
                <van-icon name="arrow" class="right right2"/>
                <div class="name photo">
                  <img src="../assets/1548410816502.jpg" alt width="100%" height="100%">
                </div>
              </router-link>
            </li>
            <li>
              <router-link to="#">
                <span class="username">用户名</span>
                <van-icon name="arrow" class="right"/>
                <span class="name">{{userInfo.loginame || userInfo.phone}}</span>
              </router-link>
            </li>
            <li>
              <router-link to="#">
                <span>收获地址</span>
                <van-icon name="arrow" class="right"/>
              </router-link>
            </li>
          </ul>
          <p class="myphone">账号绑定</p>
          <li>
            <router-link to="#">
             <van-icon name="phone-o" class="icon"/>
              <span class="username">手机</span>
              <van-icon name="arrow" class="right"/>
              <span class="name" v-if="userInfo.phone">{{userInfo.phone | hideMiddle}}</span>
            </router-link>
          </li>
        </nav>
      </div>
    </div>
    <div class="btn">
      <div @click="out">退出登录</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Dialog } from "vant";
export default {
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    out() {
      Dialog.confirm({
        title: "温馨提示",
        message: "是否退出登录"
      })
        .then(() => {
          localStorage.removeItem("userInfo");
          this.$router.push("/login");
          location.reload();
        })
        .catch(() => {
          console.log("您取消了退出登录！");
        });
    },
    onClickLeft() {
      alert(1);
    }
  },
  filters: {
    hideMiddle(val) {
      return `${val.substring(0, 3)}****${val.substring(val.length - 3)}`;
    }
  }
};
</script>

<style scoped lang="less">
.userinfo {
  width: 100%;
  background-color: #f2f2f2;
  header {
    width: 100%;
    height: 88px;
    line-height: 88px;
    display: flex;
    background-color: #0090ef;
    padding-top: 60px;
    .left {
      width: 88px;
      height: 88px;
      .i {
        font-size: 40px;
        margin-left: 25px;
        color: #fff;
        font-weight: bold;
        line-height: 88px;
      }
    }
    .center {
      flex: 1;
      text-align: center;
      font-size: 30px;
      color: #fff;
    }
    .right {
      width: 88px;
      height: 88px;
    }
  }
  .sidebar-container {
    margin-top: 20px;
    .sidebar-overlay {
      nav {
        background: #fff;
        display: block;
        li {
          line-height: 100px;
          display: flex;
          &:first-child {
            height: 140px;
            line-height: 140px;
          }
          a {
            display: block;
            width: 100%;
            box-sizing: border-box;
            border-bottom: 2px solid #ccc;
            color: #333;
            font-size: 32px;
            text-decoration: none;
            padding-left: 25px;
            .username {
              float: left;
            }
            .name {
              float: right;
              margin-right: 20px;
              color: #999;
            }
            .right {
              color: #666;
              font-size: 40px;
              color: #d1cece;
              margin-right: 30px;
              // font-weight: bold;
              float: right;
              line-height: 100px;
            }
            .right2{
              margin-top: 25px;
            }
            .photo {
              width: 100px;
              height: 100px;
              border-radius: 50%;
              margin-top: 20px;
              img {
                border-radius: 50%;
              }
            }
          }
        }
        .myphone {
          padding: 30px 0;
          font-size: 24px;
          padding-left: 15px;
          box-sizing: border-box;
          color: #999;
          background-color: #f2f2f2;
        }
        .icon {
          font-size: 40px;
          float: left;
          line-height: 96px;
          margin-right: 10px;
        }
      }
    }
  }
  .btn {
    margin: 0 auto;
    width: 90%;
    text-align: center;
    margin-top: 50px;
    background: #df5748;
    padding: 20px 0;
    box-sizing: border-box;
    color: #fff;
    border-radius: 10px;
    button {
      letter-spacing: 2px;
      font-size: 26px;
    //   border: none;
    //   outline: none;
    }
  }
}
</style>
