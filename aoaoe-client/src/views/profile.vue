<template>
  <div class="profile">
    <header class="header">
      <div class="back">
        <!-- <i class="iconfont icon-fanhui"></i> -->
      </div>
      <div class="title">我的</div>
    </header>
    <section class="content">
      <router-link :to=" userInfo ? '/userinfo':'/login'">
        <div class="profile-link">
          <div class="path">
            <img src="../assets/1548410816502.jpg" alt width="100%" height="100%">
          </div>
          <div class="user-info">
            <p class="login-reister">{{ userInfo.loginame || userInfo.phone ||"登录/注册"}}</p>
            <p class="tel">
              <span class="icon">
                <van-icon name="phone-o" class="tel2"/>
                {{ userInfo.phone ? '已绑定手机号':'暂未绑定手机号'}}
              </span>
            </p>
          </div>
          <div class="svg">
            <van-icon name="arrow"/>
          </div>
        </div>
      </router-link>
      <div class="info-data">
        <div class="price">
          <p class="yuan">
            <b>0.00</b> 元
          </p>
          <p class="yu-e">我的余额</p>
        </div>
        <div class="youhuiquan">
          <p class="yuan">
            <b>0</b> 个
          </p>
          <p class="yu-e">我的优惠</p>
        </div>
        <div class="jifen">
          <p class="yuan">
            <b>0</b> 分
          </p>
          <p class="yu-e">我的积分</p>
        </div>
      </div>
      <div class="sidebar-container">
        <div class="sidebar-overlay">
          <nav>
            <ul>
              <li>
                <van-icon name="wechat" class="icon" v-rainbow/>
                <router-link to="/">
                  <span>我的订单</span>
                  <van-icon name="arrow" class="right"/>
                </router-link>
              </li>
              <li>
                <van-icon name="cart" class="icon" v-rainbow/>
                <router-link to="/playing">
                  <span>积分商城</span>
                  <van-icon name="arrow" class="right"/>
                </router-link>
              </li>
              <li>
                <van-icon name="gem" class="icon" v-rainbow/>
                <router-link to="#">
                  <span>嗷嗷饿会员卡</span>
                  <van-icon name="arrow" class="right"/>
                </router-link>
              </li>
              <li>
                <van-icon name="friends" class="icon" v-rainbow/>
                <router-link to="#">
                  <span>服务中心</span>
                  <van-icon name="arrow" class="right"/>
                </router-link>
              </li>
              <li>
                <van-icon name="gift" class="icon" v-rainbow/>
                <router-link to="#">
                  <span>下载嗷嗷饿APP</span>
                  <van-icon name="arrow" class="right"/>
                </router-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["userInfo"])
  }
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 85px;
  display: flex;
  background-color: #3ca1e2;
  .back {
    width: 85px;
    height: 85px;
    line-height: 85px;
    text-align: center;
    i {
      font-size: 40px;
      color: #fff;
      font-weight: bold;
    }
  }
  .title {
    flex: 1;
    text-align: center;
    line-height: 86px;
    margin-left: -80px;
    color: #fff;
    font-size: 36px;
  }
}
.content {
  width: 100%;
  height: 100%;
  background-color: #ccc;
  .profile-link {
    width: 100%;
    height: 180px;
    padding: 30px;
    box-sizing: border-box;
    background-color: #3ca1e2;
    display: flex;
    .path {
      width: 116px;
      height: 116px;
      background-color: red;
      border-radius: 50%;
      margin-right: 20px;
      img {
        border-radius: 50%;
      }
    }
    .user-info {
      flex: 1;
      background-color: #3ca1e2;
      .login-reister {
        font-size: 36px;
        line-height: 80px;
        color: #fff;
      }
      .tel {
        color: #fff;
        span {
          width: 100%;
          height: 30px;
           display: flex;
           line-height: 30px;
          .tel2 {
            font-size: 30px;
            line-height: 30px;
          }
        }
      }
    }
    .svg {
      line-height: 120px;
      color: #fff;
      font-weight: bold;
      i {
        font-size: 39px;
      }
    }
  }
  .info-data {
    width: 100%;
    height: 164px;
    display: flex;
    background-color: #fff;
    margin-bottom: 16px;
    .price {
      flex: 1;
      // background-color: red;
      border-right: 1.2px solid #ccc;
      text-align: center;
      .yuan {
        line-height: 100px;
        b {
          font-weight: bold;
          font-size: 48px;
          color: orange;
        }
      }
      .yu-e {
        font-size: 28px;
        color: #777;
      }
    }
    .youhuiquan {
      flex: 1;
      text-align: center;
      // background-color: orange;
      border-right: 2px solid #ccc;
      .yuan {
        line-height: 100px;
        b {
          font-weight: bold;
          font-size: 48px;
          color: red;
        }
      }
      .yu-e {
        font-size: 28px;
        color: #777;
      }
    }
    .jifen {
      flex: 1;
      text-align: center;
      .yuan {
        line-height: 100px;
        b {
          font-weight: bold;
          font-size: 48px;
          color: orange;
        }
      }
      .yu-e {
        font-size: 28px;
        color: #777;
      }
    }
  }

  .sidebar-container {
    .sidebar-overlay {
      nav {
        background: #fff;
        display: block;
        li {
          line-height: 100px;
          // padding-left: 80px;
          display: flex;
          .icon {
            width: 80px;
            height: 100px;
            display: inline-block;
            text-align: center;
            font-size: 40px;
            line-height: 100px;
            // background-color: red;
          }
          a {
            display: block;
            width: 100%;
            box-sizing: border-box;
            border-bottom: 2px solid #ccc;
            display: flex;
            color: #333;
            font-size: 32px;
            text-decoration: none;
            justify-content: space-between;
            .right {
              color: #999;
              font-size: 30px;
              margin-right: 16px;
              line-height: 100px;
            }
          }
        }
      }
    }
  }
}
</style>

