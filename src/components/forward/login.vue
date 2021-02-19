<template>
  <div class="login">
    <el-menu mode="horizontal" class="el-menu-demo">
      <el-menu-item>
        <h3 @click="home()" class="center">点餐中心</h3>
      </el-menu-item>
      <el-menu-item class="right">
        还没有账号？
        <el-button type="primary" plain @click="register()">立即注册</el-button>
        <el-button type="primary" plain @click="adminLogin()">管理员登录</el-button>
      </el-menu-item>
    </el-menu>
    <div class="loginImg">
      <img src="https://img.zcool.cn/community/01bf3a58464a2ea8012060c82354c2.gif" alt />
    </div>
    <div class="loginForm">
      <form class="form-signin">
        <h2 class="form-signin-heading">登录</h2>
        <i class="el-icon-s-custom userIcon"></i>
        <label for="inputEmail" class="sr-only">Your Account</label>
        <input
          type="text"
          id="inputEmail"
          class="form-control"
          placeholder="Your Account"
          required
          autofocus
          v-model="userID"
        />
        <i class="el-icon-s-data passwordIcon"></i>
        <label for="inputPassword" class="sr-only">Password</label>
        <input
          type="password"
          id="inputPassword"
          class="form-control top"
          placeholder="Password"
          required
          v-model="upassword"
        />
        <button class="btn btn-lg btn-primary btn-block top" type="button" @click="getLogin()">登录</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userID: "",
      upassword: ""
    };
  },
  methods: {
    register() {
      this.$router.push({ name: "register" });
    },
    home() {
      this.$router.push({ name: "home" });
    },
    // 登录
    getLogin() {
      if (this.userID == "") {
        alert("用户名不能为空");
      } else if (this.upassword == "") {
        alert("密码为空");
      } else {
        this.$http
          .post("/api/login", {
            userID: this.userID,
            upassword: this.upassword
          })
          .then(resp => {
            if (resp.status == 200) {
                if(resp.body.length == 1){
                    window.alert('登录成功')
                    this.$router.push({name: 'home',params:{id: this.userID}})
                    localStorage.setItem('userID',this.userID);
                    localStorage.setItem('uname',resp.body[0].uname);
                    console.log(this.userID)
                } else {
                  alert('登录失败，用户名或者密码有误');
                }
            }
          });
      }
    },
    // 管理员登录页面
    adminLogin(){
      this.$router.push({name: 'adminLogin'});
    }
  }
};
</script>

<style lang="scss">
.login {
  .center {
    margin-top: 15px;
  }
  .right {
    float: right;
  }
  .loginImg {
    margin: 20px auto 0;
    width: 500px;
    height: 300px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .loginForm {
    margin: 20px auto;
    width: 300px;
    height: 200px;
    position: relative;
    .form-signin {
      .userIcon {
        position: absolute;
        top: 42px;
        left: 5px;
      }
      .passwordIcon {
        position: absolute;
        top: 86px;
        left: 5px;
      }
    }
    .top {
      margin-top: 10px;
    }
    .form-control {
      padding: 6px 25px;
    }
  }
}
</style>