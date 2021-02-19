<template>
  <div class="register">
    <el-menu mode="horizontal" class="el-menu-demo">
      <el-menu-item>
        <h3 @click="home()" class="center">点餐中心</h3>
      </el-menu-item>
      <el-menu-item class="right">
        已有账号？
        <el-button type="primary" plain @click="login()">登录</el-button>
      </el-menu-item>
    </el-menu>
    <div class="registerForm">
      <el-form :model="userInfo" label-width="80px" :rules="rules" ref="userInfo">
        <el-form-item label="ID" prop="userID">
          <el-input v-model="userInfo.userID"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="uname">
          <el-input v-model="userInfo.uname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="upassword">
          <el-input type="password" v-model="userInfo.upassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkUpassword">
          <el-input type="password" v-model="userInfo.checkUpassword"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input  v-model="userInfo.tel"></el-input>
        </el-form-item>
        <el-form-item label="住址">
          <el-input v-model="userInfo.address"></el-input>
        </el-form-item>
        <el-button type="primary" @click="getRegister()" round>注册</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // 判断密码是否输入正确
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
        this.flag = true;
      } else if (value !== this.userInfo.upassword) {
        callback(new Error("两次输入密码不一致"));
        this.flag = true;
      } else {
        this.flag = false;
      }
      callback();
    };
    return {
      userInfo: {
        uname: "",
        upassword: "",
        checkUpassword: "",
        userID: "",
        tel: "",
        address: ""
      },
      rules: {
        //输入规则
        userID: [{ required: true, message: "请输入账号", trigger: "blur" }],
        uname: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        upassword: [{ required: true,validator: validatePass, trigger: "blur" }],
        checkUpassword: [{ required: true,validator: validatePass2, trigger: "blur" }]
      },
      flag: true
    };
  },
  methods: {
    login() {
      this.$router.push({ name: "login" });
    },
    home() {
      this.$router.push({ name: "home" });
    },
    // 注册
    getRegister() {
      let userParam = this.userInfo;
      if (
        this.userInfo.uname == "" ||
        this.userInfo.upassword == "" ||
        this.userInfo.checkUpassword == "" ||
        this.userInfo.userID == ""
      ) {
        alert("不能留有空白处哦");
      } else if (this.flag) {
        alert("请确认正确输入密码!");
        return
      } else {
        this.$http
          .post("/api/register", { userParam: userParam })
          .then(resp => {
              if (resp.body == 1) {
                alert("注册成功");
                this.login();
              } else {
                alert("注册失败，" + resp.body);
              }
          });
      }
    }
  }
};
</script>

<style lang="scss">
.register {
  .center {
    margin-top: 15px;
  }
  .registerForm {
    width: 500px;
    height: 500px;
    margin: 50px auto 0;
  }
  .right {
    float: right;
  }
}
</style>