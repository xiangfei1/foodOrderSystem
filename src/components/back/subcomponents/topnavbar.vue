<template>
  <div class="topnavbar">
    <nav class="navbar navbar-fixed-top navbar-inverse">
      <div class="navbar-header">
        <router-link class="navbar-brand" :to="'/restaurantinfo'">外卖点餐系统</router-link>
      </div>
      <div style="float: right;width:100px;height:50px;lineHeight:50px;">
        <el-button type="primary" plain @click="logOut()">退出登录</el-button>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  methods: {
    logOut(){
      this.$router.push({name: 'adminLogin'});
    }
  },
};
</script>

<style lang="scss">
</style>