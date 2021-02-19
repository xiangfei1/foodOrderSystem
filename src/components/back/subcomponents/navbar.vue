<template>
  <div class="navtab">
    <el-menu :default-active="index" class="el-menu-vertical-demo">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <router-link :to="'/restaurantinfo'" class="change" tag="span">餐厅信息</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-s-goods"></i>
        <router-link :to="'/restaurantgoods'" class="change" tag="span">餐品信息</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-tickets"></i>
        <router-link :to="'/restaurantpay'" class="change" tag="span">订单信息</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <router-link :to="'/restaurantaccount'" class="change" tag="span">账号信息</router-link>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-s-custom"></i>
        <router-link :to="'/restaurantdispatcher'" class="change" tag="span">配送员信息</router-link>
      </el-menu-item>
      <el-menu-item index="6">
        <i class="el-icon-guide"></i>
        <router-link :to="'/restaurantclassify'" class="change" tag="span">分类信息</router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props:["index"]
};
</script>

<style lang="scss">
.navtab {
  display: inline-block;
  width: 145px;
  height: 700px;
  background: #f3f3af;
  .el-menu {
    background: none;
  }
  .change {
    display: inline-block;
    width: 80px;
    height: 56px;
    vertical-align: middle;
  }
}
</style>