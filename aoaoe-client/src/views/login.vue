<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">嗷嗷饿外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on: loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button
                :disabled="!rightPhone"
                class="get_verification"
                :class="{right_phone:rightPhone}"
                @click.prevent="getCode"
              >{{computeTime>0 ? `(${computeTime}s)已发送` : '获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册嗷嗷饿外卖的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginWay}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="loginame">
              </section>
              <section class="login_verification">
                <input type="password" maxlength="8" placeholder="密码" v-model="password">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <!--利用$router.back()返回上一级路由 -->
      <a href="javascript:" class="go_back" @click="$router.push('/')">
        <van-icon name="arrow-left" class="icon" />
      </a>
    </div>
  </section>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      loginWay: false, // true代表短信登陆, false代表密码
      phone: "", // 手机号
      computeTime: 0,
      loginame: "",
      password: "",
      code: "" // 短信验证码
    };
  },
  methods: {
    getCode() {
      if (!this.computeTime) {
        //启动倒计时
        this.computeTime = 30;
        const intervalId = setInterval(() => {
          this.computeTime--;
          if (this.computeTime <= 0) {
            //停止计时器
            clearInterval(intervalId);
          }
        }, 1000);
        //发送请求
        this.$http
          .get("http://www.chenruisheng.info/aoaoe/api/user/sendcode?phone=" + this.phone)
          .then(res => {
            if (res.data.code == 0) {
              Toast.success("验证码发送成功");
            } else if (res.data.code == 1) {
              Toast.fail("验证码发送失败");
              clearInterval(intervalId);
              this.computeTime = 0;
            }
          })
          .catch(err => {});
      }
    },
    submit() {
      if (this.loginWay) {
        const { rightPhone, phone, code } = this;
        if (!this.rightPhone) {
          //手机号不正确
          Toast.fail("手机号错误");
          return;
        } else if (!/^\d{6}$/.test(code)) {
          //验证必须是 6位数字
          Toast.fail("必须是6位数字");
          return;
        }
        //发生请求，短信登录
        this.$http
          .post("http://www.chenruisheng.info/aoaoe/api/user/login_sms", {
            phone: this.phone,
            code: this.code
          })
          .then(res => {
            console.log(res);
            if (res.data.code != 0) {
              Toast.fail("手机或验证码错误");
            } else {
              const user = res.data.data
              this.$store.commit('SAVE_USERINFO',user)
              this.$router.push("/profile");
            }
          })
          .catch(err => {
            alert(1);
          });
      } else {
        //密码登录
        const { loginame, password } = this;
        if (!this.loginame) {
          //用户名不能为空
          Toast.fail("用户名不能为空");
          return;
        } else if (!this.password) {
          //密码不能为空
          Toast.fail("密码不能为空");
          return;
        }
        //发送请求。密码登录
        this.$http
          .post("http://www.chenruisheng.info/aoaoe/api/user/login_pwd", {
            loginame: this.loginame,
            password: this.password
          })
          .then(res => {
            console.log(res)
            if(res.data.code == 1){
              Toast.fail(res.data.msg);
            }else{
              const user = res.data.data
              this.$store.commit('SAVE_USERINFO',user)            
              this.$router.push("/profile");
            }
           
          })
          .catch(err => {});
      }
    }
  },
  computed: {
    rightPhone() {
      // 利用正则对手机号进行匹配，返回布尔值
      return /^1\d{10}$/.test(this.phone);
    }
  }
};
</script>

<style lang="less" scoped>
.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;
  .loginInner {
    padding-top: 250px;
    width: 80%;
    margin: 0 auto;
    .login_header {
      .login_logo {
        font-size: 80px;
        font-weight: bold;
        color: #20a3e2;
        text-align: center;
      }
      .login_header_title {
        padding-top: 80px;
        text-align: center;
        a {
          color: #333;
          font-size: 28px;
          padding-bottom: 8px;
          &:first-child {
            margin-right: 80px;
          }
          &.on {
            color: #20a3e2;
            font-weight: 700;
            border-bottom: 4px solid #20a3e2;
          }
        }
      }
    }
    .login_content {
      form {
        div {
          display: none;
          &.on {
            display: block;
          }
        }

        input {
          width: 100%;
          height: 100%;
          padding-left: 20px;
          box-sizing: border-box;
          border: 2px solid #ddd;
          border-radius: 8px;
          outline: 0;
          font: 400 28px Arial;
          &:focus {
            border: 2px solid #20a3e2;
          }
        }
        .login_message {
          position: relative;
          margin-top: 32px;
          height: 96px;
          font-size: 28px;
          background: #fff;
          .get_verification {
            position: absolute;
            top: 50%;
            right: 20px;
            transform: translateY(-50%);
            border: 0;
            color: #ccc;
            font-size: 28px;
            background: transparent;
            &.right_phone {
              color: black;
            }
          }
        }
        .login_verification {
          margin-top: 32px;
          height: 96px;
          font-size: 28px;
          background: #fff;
        }
        .login_hint {
          margin-top: 24px;
          color: #999;
          font-size: 28px;
          line-height: 40px;
          a {
            color: #20a3e2;
          }
        }
        .login_submit {
          display: block;
          width: 100%;
          height: 84px;
          margin-top: 60px;
          border-radius: 8px;
          background: #20a3e2;
          color: #fff;
          text-align: center;
          font-size: 32px;
          line-height: 84px;
          border: 0;
        }
      }
      .about_us {
        display: block;
        font-size: 24px;
        margin-top: 40px;
        text-align: center;
        color: #999;
      }
    }
    .go_back {
      position: absolute;
      top: 50px;
      left: 30px;
      width: 60px;
      height: 60px;
      .icon {
        font-size: 40px;
        color: #999;
        line-height: 60px;
      }
    }
  }
}
</style>

