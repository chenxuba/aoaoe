<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title iconfont icon-icon-test">嗷嗷饿在线管理系统</span>
      </div>
      <el-form
        :model="loginUser"
        :rules="rules"
        ref="loginForm"
        class="loginForm"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="loginame">
          <el-input v-model="loginUser.loginame" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginUser.password" placeholder="请输入密码" type="password" @keyup.enter.native="submitForm('loginForm')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登 录</el-button>
        </el-form-item>
        <div class="tiparea">
          <p>还没有账号？现在
            <router-link to="/register">注册</router-link>
          </p>
        </div>
      </el-form>
    </section>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  name: "login",
  data() {
    return {
      loginUser: {
        loginame: "",
        password: ""
      },
      rules: {
        loginame: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("http://chenruisheng.info/aoaoe/api/login", this.loginUser)
            .then(res => {
              // console.log(res)
              if(res.data.isSuccess == false){
                alert("用户名不存在或者密码错误，请重新输入")
              }else{
                //token
              const {token} = res.data;
              // console.log(token)
              //存储到ls
              localStorage.setItem("eleToken",token);
              //解析token
              const decoded = jwt_decode(token);
              console.log(decoded)
              //token存储到vuex中
              this.$store.dispatch(
                "setIsAutnenticated",!this.isEmpty(decoded)
              );
              this.$store.dispatch("setUser", decoded);
              this.$router.push("/index");
              }
              
            });
            
        }
        
      });
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../../src/assets/bj001.gif") repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 20%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #e95c5c;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>


