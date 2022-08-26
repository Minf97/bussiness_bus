<template>
  <div class="login-container">
    <el-form :model="formData" :rules="formRules" ref="formData">
      <span class="title">公交车入厂维修管理系统</span>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="formData.username"
          auto-complete="off"
          @change="formData.username=formData.username.replace(/\s+/g,'')"
          prefix-icon="icon iconfont icon-peoplefill"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          :type="state ? 'text' : 'password'"
          v-model="formData.password"
          auto-complete="off"
          prefix-icon="icon iconfont icon-mima"
          placeholder="请输入密码"
        >
          <i
            slot="suffix"
            @click="showOrHide"
            style="cursor:pointer;"
            :class="state ? 'icon iconfont icon-yanjing_kai' : 'icon iconfont icon-yanjing_bi'"
          ></i>
        </el-input>
      </el-form-item>
      <el-form-item style="padding-top:20px">
        <el-button class="login-button" @click.native.prevent="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  //登录  校验
  name: "Login",
  data() {
    return {
      state: false,
      logining: false,
      formData: {
        username: "admin",
        password: "123456"
      },
      formRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    showOrHide() {
      this.state = !this.state;
    },
    handleLogin() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          let that = this;

          try {
            // 登录标志位
            let flag = false;
            let userInf = {};

            if(
              that.formData.username == 'admin' &&
              that.formData.password == '123456'
            ) {
              flag = true;
              userInf = {
                username: that.formData.username,
                password: that.formData.password
              };
            }

            if (!flag) {
              this.$message({
                message: "用户名或密码错误",
                type: "error"
              });
            } else {
              // 缓存
              sessionStorage.setItem("userInf", JSON.stringify(userInf));
              // 去到这个路由
              this.$router.push({ path: "/automobileInfMng" });
            }
          } catch(error) {
            that.$message({
              message: "网络错误,请稍后再试",
              type: "error"
            });
          };
        }
      });
    }
  }
};
</script>
<style scoped>
.login-container {
  border-radius: 5px;
  background-clip: padding-box;
  margin: 25vh auto;
  width: 300px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.title {
  display: block;
  text-align: center;
  margin: 0px auto 40px auto;
  color: #505458;
  font-size: 40px;
}
.el-form-item {
  margin-bottom: 22px;
}
.login-button {
  width: 100%;
  background-color: #f6db63;
  border-color: #f6db63;
  color: #505458;
  font-size: 16px;
}
button:hover {
  background-color: #ffec8b;
  border-color: #ffec8b;
}
button:active{
  background-color: #f6db63;
  border-color: #f6db63;
}
</style>
