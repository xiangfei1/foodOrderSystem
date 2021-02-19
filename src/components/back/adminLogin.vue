<template>
  <div class="hello">
    <el-menu mode="horizontal" class="el-menu-demo">
      <el-menu-item>
        <h3 @click="home()" class="center">点餐中心</h3>
      </el-menu-item>
      <el-menu-item class="right">
        <el-button type="primary" plain @click="tologin()">用户登录</el-button>
      </el-menu-item>
    </el-menu>
    <div class="title">
      <img
        src="http://www.molihua.net/data/attachment/forum/201611/24/153558k1nsqn0gcsb0wbsg.gif"
        alt
      />
    </div>
    <h1>欢迎来到点餐系统</h1>
    <div class="form">
      <form class="form-horizontal">
        <div class="form-group">
          <!-- <label class="col-sm-2 control-label">账号</label> -->
          <div class="col-sm-10">
            <i class="el-icon-key accountIcon"></i>
            <input
              type="text"
              class="form-control"
              id="number"
              placeholder="put you account number"
              v-model="accountID"
            />
          </div>
        </div>
        <div class="form-group">
          <!-- <label class="col-sm-2 control-label">密码</label> -->
          <div class="col-sm-10">
            <i class="el-icon-lock passwordIcon"></i>
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              v-model="rpassword"
            />
          </div>
        </div>
        <div class="button">
          <button
            type="button"
            class="btn btn-lg btn-primary btn-block top"
            @click="login()"
          >
            登录
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accountID: "",
      rpassword: ""
    };
  },
  methods: {
    // 点餐中心
    home() {
      this.$router.push({ name: "home" });
    },
    // 管理员登录
    login() {
      let _this = this;
      let loginparams = {
        accountID: this.accountID,
        rpassword: this.rpassword
      };
      if (this.accountID == "") {
        alert("用户名不能为空");
        return;
      } else if (this.rpassword == "") {
        alert("密码不能为空");
        return;
      } else {
        this.$http.post("/api/adminLogin", loginparams).then(resp => {
          if (resp.status == 200) {
            if (resp.body.length == 1) {
              alert("登录成功");
              _this.$router.push({
                name: "resInfo"
              });
            } else {
              alert("登录失败，密码或用户名错误");
            }
          } else {
            alert(resp.status);
          }
        });
      }
    },
    // 用户登录
    tologin() {
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hello {
  text-align: center;
  .center {
    margin-top: 15px;
  }
  .right {
    float: right;
  }
  .title {
    width: 400px;
    height: 270px;
    margin: 20px auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .form {
    width: 330px;
    margin: 25px auto;
    .form-group {
      .col-sm-10 {
        width: 350px;
        .accountIcon {
          position: absolute;
          top: 12px;
          left: 20px;
        }
        .passwordIcon {
          position: absolute;
          top: 10px;
          left: 20px;
        }
        .form-control {
          padding: 6px 25px;
        }
      }
    }
    .button {
      width: 300px;
      margin: auto auto;
    }
  }
}
</style>
