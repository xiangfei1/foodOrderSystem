<template>
  <div class="userInfo">
    <!-- 导航栏 -->
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <!-- @select="handleSelect" -->
      <el-menu-item @click="home()">点餐中心</el-menu-item>
      <el-menu-item @click="pay()">订单管理</el-menu-item>
    </el-menu>
    <!-- 用户信息 -->
    <div class="userData">
      <el-form
        :model="userInfo"
        :rules="rules"
        ref="userInfo"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="uname">
          <el-input v-model="userInfo.uname"></el-input>
        </el-form-item>
        <el-form-item label="用户账号">
          <el-input v-model="userInfo.userID" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="upassword">
          <el-input v-model="userInfo.upassword"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="userInfo.tel"></el-input>
        </el-form-item>
        <el-form-item label="用户地址">
          <el-input v-model="userInfo.address"></el-input>
        </el-form-item>
        <el-form-item label="用户余额(元)">
          <el-input v-model="userInfo.money" disabled></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="getUpdateUserinfo(userInfo)">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      rules: {
        uname: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        upassword: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ]
      },
      id: this.$route.params.id
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    home() {
      this.$router.push({ name: "home" });
    },
    pay(){
      this.$router.push({name: 'shopcar'});
    },
    getUserInfo() {
      let id = this.id;
      this.$http.post("/api/userInfo", { userID: id }).then(resp => {
        if (resp.status == 200) {
          this.userInfo = resp.body[0];
        }
      });
    },
    getUpdateUserinfo(userInfo) {
      let userParam = {
        userID: userInfo.userID,
        uname: userInfo.uname,
        upassword: userInfo.upassword,
        address: userInfo.address,
        tel: userInfo.tel,
        money: userInfo.money
      };
      this.$refs.userInfo.validate(valid => {
        if (valid) {
          this.$http.post("/api/userInfo/update", userParam).then(resp => {
            if (resp.status == 200) {
              if (resp.body == 1) {
                alert("修改成功");
                this.getUserInfo();
              }
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="scss">
.userInfo {
  .userData {
    width: 500px;
    height: 400px;
    margin: 50px auto 0;
  }
}
</style>