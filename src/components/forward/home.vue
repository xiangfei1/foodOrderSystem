<template>
  <div class="home">
    <el-backtop>
      <i class="el-icon-caret-top"></i>
    </el-backtop>
    <!-- 导航栏 -->
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <!-- @select="handleSelect" -->
      <el-menu-item index="1">
        <el-button
          size="mini"
          type="info"
          @click="open()"
          circle
          class="el-icon-s-shop"
        ></el-button>
        &nbsp;{{ restaurant.name }}
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">个人中心</template>
        <div v-if="isLogin">
          <el-menu-item>请先登陆!</el-menu-item>
        </div>
        <div v-else>
          <el-menu-item>当前用户：{{ userName.uname }}</el-menu-item>
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
      <el-menu-item index="3" @click="pay()">订单管理</el-menu-item>
      <el-menu-item>
        <el-input v-model="search" @keyup.enter.native="toSearch"></el-input>
      </el-menu-item>
      <div v-if="isLogin">
        <el-menu-item class="right">
          <el-button type="primary" plain @click="login()">登录</el-button>
          <el-button type="success" plain @click="register()">注册</el-button>
        </el-menu-item>
      </div>
      <div v-else>
        <el-menu-item class="right">
          <el-button type="primary" plain @click="outLogin()"
            >退出登陆</el-button
          >
        </el-menu-item>
      </div>
    </el-menu>
    <!-- 回到顶部 -->
    <div class="con-slider">
      <slider></slider>
    </div>
    <!-- 标签页 -->
    <div class="tab">
      <el-tabs class="tabPage" v-model="activeName">
        <el-tab-pane
          v-for="item in options"
          :key="item.value"
          :label="item.cname"
          :name="item.cname"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <goods :activeName="activeName"></goods>
    <hr />
    <!-- 推荐商品 -->
    <div class="recommend">
      <h3>推荐商品</h3>
      <hr style="color:#E9EAED;height:2px;" />
      <div class="rec-list">
        <div class="rec-item" v-for="(item, index) in recGoods" :key="index">
          <div class="rec-img">
            <img :src="item.url" alt />
          </div>
          <div class="rec-body">
            <p class="rec-title">{{ item.name }}</p>
            <p class="rec-price">￥：{{ item.gPrice }}</p>
            <button
              type="button"
              class="layui-btn layui-btn-fluid rec-btn"
              @click="toGoodsInfo(item.gID)"
            >
              商品详情
            </button>
          </div>
          <div class="goods-recommendInfo">
            <h3 class="goods-recommendInfo-title">商品信息</h3>
            <hr style="color:#E9EAED;height:2px;" />
            <div class="goods-recommendInfo-body">
              {{ item.gInfo }}
            </div>
          </div>
        </div>
        <div class="pageOption">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="currentPagehome"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 折扣 -->
    <div class="discount" @click="goodsDiscount()">
      <h3>促销</h3>
      <hr style="width:150px;height:10px;backgroundColor:#62c87d;" />
      <div class="marquee" v-for="(item, index) in discountInfo" :key="index">
        <span>{{ item.gInfo }}</span>
      </div>
    </div>
    <!-- 折扣信息 -->
    <el-drawer title="促销商品" :visible.sync="drawer" :direction="direction">
      <div
        class="goodsDiscount"
        v-for="(item, index) in discountInfo"
        :key="index"
      >
        <div class="imgInfo">
          <img :src="item.url" alt />
        </div>
        <div class="goodsInfo">
          <p class="title">{{ item.name }}</p>
          <p class="price">￥：{{ item.gPrice }}</p>
          <button
            type="button"
            class="layui-btn layui-btn-fluid details"
            @click="toGoodsInfo(item.gID)"
          >
            商品详情
          </button>
        </div>
      </div>
    </el-drawer>
    <!-- 顾客访问量排前三商品 -->
    <div class="goodsRank">
      <h3>排名</h3>
      <hr style="width:150px;height:10px;backgroundColor:#62c87d;" />
      <div
        class="goodsRank-item"
        v-for="(item, index) in rankName"
        :key="index"
      >
        <span class="goodsRank-item-title" @click="toGoodsInfo(item.gID)">
          <i class="el-icon-shopping-cart-full"></i> {{ item.name }}
          <i>{{ rankValue[index] }}</i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import goods from "@/components/forward/show/goodsDetail";
import slider from "@/components/forward/subcomponents/slider";
export default {
  inject: ["reload"], //页面刷新
  data() {
    return {
      activeIndex: "1",
      activeName: "早餐",
      userName: {}, //获取用户信息
      userID: localStorage.getItem("userID") || "[]", //获取本地登录信息
      isLogin: true, //判断是否登录
      discountInfo: [],
      recGoods: [], //推荐信息
      drawer: false,
      direction: "ltr", //抽屉从左边开启
      restaurant: {}, //获取餐厅信息
      options: [], //分类信息
      total: 0, //推荐商品总数据
      page: 1, //商品页数
      pageSize: 4, //商品一页显示数据
      rankName: [], //排行商品名称
      rankValue: [], //排行积分
      search: "" //搜索内容
    };
  },
  mounted() {
    this.getUserName();
    this.judge();
    this.getDiscount();
    this.getRecommend(this.page);
    this.getRestaurantInfo();
    this.getClassify();
    this.getGoodsRank();
  },
  methods: {
    // 跳转登录页面
    login() {
      this.$router.push({ name: "login" });
    },
    // 跳转注册页面
    register() {
      this.$router.push({ name: "register" });
    },
    // 跳转订单管理页面
    pay() {
      this.$router.push({ name: "shopcar" });
    },
    // 获取用户信息
    getUserName() {
      let userID = this.userID;
      this.$http.post("/api/userInfo", { userID: userID }).then(resp => {
        if (resp.status == 200) {
          if (resp.body.length == 1) {
            this.userName = resp.body[0];
          }
        }
      });
    },
    judge() {
      // 判断是否登录
      let userID = this.userID;
      if (userID == "[]") {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
    // 退出登录
    outLogin() {
      localStorage.setItem("userID", "[]");
      localStorage.setItem("uname", "");
      this.reload();
    },
    //获取折扣商品促销信息
    getDiscount() {
      let cID = "1";
      this.$http.post("/api/discountGoods", { cID: cID }).then(resp => {
        if (resp.status == 200) {
          if (resp.body.length != 0) {
            console.log(resp)
            this.discountInfo = resp.body;
          }
        }
      });
    },
    // 获取推荐信息
    getRecommend(pageNo) {
      this.page = pageNo || this.page;
      this.$http
        .post("/api/recommend", { page: this.page, pageSize: this.pageSize })
        .then(resp => {
          if (resp.status == 200) {
            this.recGoods = resp.body.data2;
            this.total =
              Math.ceil(parseInt(resp.body.total) / parseInt(this.pageSize)) *
              10;
          }
        });
    },
    // 推荐商品分页
    currentPagehome(currentPageNum) {
      this.getRecommend(currentPageNum);
    },

    // 跳转折扣商品
    goodsDiscount() {
      this.drawer = true;
    },
    // 跳转商品详情页面
    toGoodsInfo(id) {
      this.$router.push({ name: "goodsinfo", params: { gID: id } });
    },
    // 获取餐厅信息
    getRestaurantInfo() {
      this.$http.post("/api/restaurantInfo").then(resp => {
        if (resp.status == 200) {
          this.restaurant = resp.body[0];
        }
      });
    },
    // 显示餐厅信息
    open() {
      const h = this.$createElement;
      this.$notify({
        title: "餐厅详情",
        message: h("i", { style: "color: teal" }, this.restaurant.rHistory)
      });
    },
    // 获取分类信息
    getClassify() {
      this.$http.get("/api/goodsInfo/classifyInfo").then(resp => {
        if (resp.status == 200) {
          this.options = resp.body;
        }
      });
    },
    // 获取商品排行
    getGoodsRank() {
      this.$http.get("/api/home/goodsRank").then(resp => {
        if (resp.status == 200) {
          this.rankName = resp.body.data;
          this.rankValue = resp.body.value;
        }
      });
    },
    // 跳转搜索页面
    toSearch() {
      localStorage.setItem("search", this.search);
      this.$router.push({
        name: "search",
        params: { searchValue: this.search }
      });
    }
  },
  components: {
    goods,
    slider
  }
};
</script>

<style lang="scss">
a {
  color: #fff;
  text-decoration: none;
}
a:hover {
  color: #ffd04b;
  text-decoration: none;
}
.home {
  height: 1750px;
  .discount {
    width: 300px;
    height: 310px;
    position: absolute;
    bottom: -30px;
    left: 10px;
    padding: 10px 10px;
    background-color: white;
    overflow-y: auto;
    .marquee {
      height: 20px;
      width: 290px;
      margin-top: 20px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      span:hover {
        color: #ffd04b;
      }
    }
  }
  .goodsRank {
    position: absolute;
    bottom: -220px;
    left: 10px;
    width: 300px;
    height: 180px;
    padding: 10px 10px;
    background: #fff;
    .goodsRank-item {
      width: 290px;
      .goodsRank-item-title {
        font-size: 16px;
        display: inline-block;
      }
    }
    .goodsRank-item-title:hover {
      color: #ffd04b;
    }
  }
  .con-slider {
    width: 800px;
    height: 300px;
    margin: 20px auto;
  }
  .tab {
    width: 800px;
    margin: auto auto;
  }
  .right {
    float: right;
  }
  .tabPage {
    margin-top: 50px;
  }
  .recommend {
    height: 685px;
    width: 840px;
    margin: auto auto;
    .rec-list {
      width: 840px;
      height: 500px;
      .rec-item {
        width: 840px;
        height: 137px;
        border: 1px solid #29cea5;
        transition: all 0.5s;
        margin-bottom: 15px;
        .rec-img {
          width: 225px;
          height: 135px;
          float: left;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .rec-body {
          width: 100px;
          height: 135px;
          background-color: #fff;
          position: relative;
          float: left;
          .rec-title {
            font-size: 20px;
            font-family: "楷体";
            color: black;
          }
          .rec-price {
            margin: 20px auto 0;
            font-size: 16px;
            color: red;
          }
          .rec-btn {
            position: absolute;
            bottom: 10px;
          }
        }
        .goods-recommendInfo {
          float: left;
          width: 513px;
          height: 135px;
          background: #fff;
          border-left: 1px solid #29cea5;
          .goods-recommendInfo-title {
            margin-left: 10px;
            margin-top: 10px;
          }
          .goods-recommendInfo-body {
            text-indent: 2em;
          }
        }
        &:hover {
          // z-index: 999;
          transform: translateY(10px);
          box-shadow: 5px 5px 5px rgba(109, 123, 121, 1);
        }
      }
    }
  }
  .map {
    iframe {
      border: none;
      width: 100%;
      min-height: 350px;
    }
  }
  .onlineMap {
    font-size: 18px;
    font-family: "楷体";
  }
}
.goodsDiscount {
  width: 400px;
  height: 200px;
  margin-left: 20px;
  margin-top: 10px;
  border: 1px solid black;
  border-radius: 20px;
  overflow: hidden;
  .imgInfo {
    width: 250px;
    height: 200px;
    float: left;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .goodsInfo {
    width: 120px;
    height: 200px;
    float: left;
    padding-top: 30px;
    position: relative;
    .title {
      font-size: 20px;
      font-family: "楷体";
      overflow: hidden;
    }
    .price {
      margin-top: 10px;
      color: red;
    }
    .details {
      position: absolute;
      bottom: 25px;
    }
  }
}
.el-drawer.ltr,
.el-drawer.rtl,
.el-drawer__container {
  overflow-y: auto;
}
</style>
