<template>
  <div>
    <!-- 导航栏 -->
    <nav class="navbar navbar-fixed-top navbar-inverse">
      <div class="container">
        <div class="navbar-header">
          <router-link class="navbar-brand" :to="'/restaurantinfo/'+id">外卖点餐系统</router-link>
        </div>
      </div>
    </nav>
    
    <!-- 按钮组 -->
    <div class="cmt-btn">
      <el-button @click="getBack()" plain>返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id
    };
  },
  methods: {
    // 返回付款信息页面
    getBack() {
      let id = this.id;
      this.$router.push({ name: "resPay", params: id });
    }
  }
};
</script>

<style lang="scss">
</style>