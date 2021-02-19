<template>
  <div class="search">
    <!-- 导航栏 -->
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item @click="home()">点餐中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">个人中心</template>
        <div v-if="isLogin">
          <el-menu-item>请先登陆!</el-menu-item>
        </div>
        <div v-else>
          <el-menu-item>当前用户：{{ uname }}</el-menu-item>
          <el-menu-item>
            <router-link
              :to="'/userinfo/' + userID"
              tag="a"
              style="display: inline-block; width: 200px; height: 26px;"
              >用户信息</router-link
            >
          </el-menu-item>
        </div>
      </el-submenu>
      <el-menu-item @click="pay()">订单管理</el-menu-item>
      <div v-if="isLogin">
        <el-menu-item style="float: right;">
          <el-button type="primary" plain @click="login()">登录</el-button>
          <el-button type="success" plain @click="register()">注册</el-button>
        </el-menu-item>
      </div>
      <div v-else>
        <el-menu-item style="float: right;">
          <el-button type="primary" plain @click="outLogin()"
            >退出登陆</el-button
          >
        </el-menu-item>
      </div>
    </el-menu>

    <!-- 搜索结果 -->
    <div class="result">
      <h3>搜索结果</h3>
      <div class="search-container">
        <div class="container-item" v-for="(item, index) in searchArr">
          <div class="item-img">
            <img
              :src="item.url"
              :alt="item.name"
              @click="toGoodsInfo(item.gID)"
            />
          </div>
          <span class="item-price"
            >{{ item.gPrice }} <i class="el-icon-food"></i
          ></span>
          <div class="item-info">
            {{ item.gInfo }}
          </div>
        </div>
      </div>
        <el-pagination background layout="prev, pager, next"@current-change="currentPage" :total="total">
        </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"], //页面刷新
  data() {
    return {
      uname: localStorage.getItem("uname") || "[]",
      userID: localStorage.getItem("userID") || "[]",
      searchValue:
        this.$route.params.searchValue || localStorage.getItem("search"),
      isLogin: true,
      searchArr: [],  //搜索结果
      page: 1,  //页码
      pageSize: 8,  //一页显示最大数据
      total: 0, //总页数
    };
  },
  mounted() {
    this.judge();
    this.getSearch(this.page);
  },
  methods: {
    home() {
      this.$router.push({ name: "home" });
    },
    pay() {
      this.$router.push({ name: "shopcar" });
    },
    login() {
      this.$router.push({ name: "login" });
    },
    register() {
      this.$router.push({ name: "register" });
    },
    // 跳转商品详情页面
    toGoodsInfo(id) {
      this.$router.push({ name: "goodsinfo", params: { gID: id } });
    },
    judge() {
      // 判断是否登录
      let userID = this.userID;
      //   console.log(this.searchValue)
      if (userID == "[]") {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
    outLogin() {
      localStorage.setItem("userID", "[]");
      localStorage.setItem("uname", "");
      this.reload();
    },
    // 显示查询结果
    getSearch(pageNo) {
      this.page = pageNo || this.page
      this.$http
        .post("/api/goodsInfo/search", { value: this.searchValue ,page: this.page,pageSize: this.pageSize})
        .then(resp => {
          if (resp.status == 200) {
            this.searchArr = resp.body.data;
            this.total = Math.ceil(parseInt(resp.body.total)/this.pageSize)
          }
        });
    },
    // 页面选择事件
    currentPage(currentPage) {
      this.getSearch(currentPage)
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  .result {
    margin: 20px 10px;
    width: 1240px;
    height: 800px;
    .search-container {
      margin: 10px 0;
      display: flex;
      flex-wrap: wrap;
      height: 600px;
      .container-item {
        width: 300px;
        height: 290px;
        background: #fff;
        margin: 0 10px 10px 0;
        .item-img {
          width: 300px;
          height: 235px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            transition: all 0.3s;
            &:hover {
              transform: scale(1.1);
            }
          }
        }
        .item-price {
          float: right;
          background: red;
          border-radius: 10px;
          display: block;
          width: 40px;
          text-align: center;
        }
        .item-info {
          width: 260px;
          text-indent: 2em;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>
