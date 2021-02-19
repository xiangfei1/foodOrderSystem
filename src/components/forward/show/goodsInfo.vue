<template>
  <div class="goodsInfo">
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
      <el-menu-item
        v-if="userID != '[]' && userID != null"
        @click="toUserInfo()"
        >用户信息</el-menu-item
      >
      <el-menu-item @click="shopCar()">订单管理</el-menu-item>
    </el-menu>
    <!-- 商品内容 -->
    <div class="goodsContent">
      <div class="Img">
        <img :src="goodInfo.url" alt />
      </div>
      <div class="goods">
        <p class="title">{{ goodInfo.name }}</p>
        <div class="content">{{ goodInfo.gInfo }}</div>
        <p class="other">
          <i class="el-icon-caret-right"></i>
          <span>价格：{{ goodInfo.gPrice }} ￥</span>
        </p>
        <el-input-number
          v-model="num"
          :min="0"
          :max="goodInfo.num"
          label="购买数量"
        ></el-input-number>
        <el-button type="danger" @click="payGoods('1')" round
          >立即购买</el-button
        >
        <el-button type="danger" @click="payGoods('0')" round
          >加入购物车</el-button
        >
      </div>
      <div class="comment">
        <h2>商品评论</h2>
        <hr style="height:5px;" />
        <comment :id="goodInfo.gID"></comment>
      </div>
    </div>
  </div>
</template>

<script>
import comment from "@/components/forward/subcomponents/comments.vue";
export default {
  data() {
    return {
      id: this.$route.params.gID,
      goodInfo: {},
      userID: localStorage.getItem("userID"),
      userInfo: {},
      num: 0,
      payID: ""
    };
  },
  mounted() {
    this.getGoodsByid();
    this.getUserInfo();
  },
  methods: {
    // 跳转主页
    home() {
      this.$router.push({ name: "home" });
    },
    // 跳转用户信息页面
    toUserInfo() {
      let userID = this.userID;
      this.$router.push({ name: "userInfo", params: { id: userID } });
    },
    // 跳转订单管理页面
    shopCar() {
      this.$router.push({ name: "shopcar" });
    },
    // 根据商品ID获取商品信息
    getGoodsByid() {
      this.$http.post("/api/goodsInfoByid", { gID: this.id }).then(resp => {
        if (resp.status == 200) {
          this.goodInfo = resp.body[0];
        }
      });
    },
    // 获取登录用户信息
    getUserInfo() {
      let id = this.userID;
      if (id == "[]") {
        console.log("尚未登录");
      } else {
        this.$http.post("/api/userInfo", { userID: id }).then(resp => {
          if (resp.status == 200) {
            this.userInfo = resp.body[0];
          }
        });
      }
    },
    // 购买与购物车
    payGoods(id) {
      let num;
      // console.log(this.num)
      if (this.userID == "[]" || this.userID == null) {
        alert("还没有登录哦");
      } else if (this.userInfo.tel == "" || this.userInfo.address == "") {
        alert("您的用户信息不完整");
      } else {
        let payParam = {
          gID: this.id,
          num: this.num,
          info: "等待配送",
          uname: this.userInfo.uname,
          tel: this.userInfo.tel,
          address: this.userInfo.address,
          state: id,
          userID: this.userID,
          name: this.goodInfo.name,
          gPrice: this.goodInfo.gPrice,
          url: this.goodInfo.url,
          sTime: new Date(),
          drawback: ""
        };
        let price = this.userInfo.money - this.goodInfo.gPrice * this.num;
        if (this.userInfo.money == 0 || price < 0) {
          alert("用户余额不足");
          return;
        } else if (this.goodInfo.num <= 0) {
          alert("该商品已售完，请选择其他餐品哦");
          return;
        } else if (this.num == 0 || this.num == undefined) {
          alert("商品数量不能为0或者为空哦");
          return;
        } else {
          num = parseInt(this.goodInfo.num) - this.num;
        }
        let _this = this;
        this.$http.post("/api/pay", { payParam: payParam }).then(resp => {
          // console.log(resp.body)
          if (resp.body == 1) {
            if (id == "1") {
              // alert('1')
              _this.$http
                .post("/api/goodsInfo/upate/num", { gID: _this.id, num: num })
                .then(res => {
                  if (res.status == 200) {
                    console.log("数量已变");
                    _this.getGoodsByid();
                  }
                });
              _this.$http
                .post("/api/userInfo/update/money", {
                  userID: _this.userID,
                  money: price
                })
                .then(res2 => {
                  if (res2.body == 1) {
                    alert("付款成功");
                  }
                });
            } else {
              alert("加入购车成功");
            }
          }
        });
      }
    }
  },
  components: {
    comment: comment
  }
};
</script>

<style lang="scss">
.goodsInfo {
  a {
    text-decoration: none;
  }
  .goodsContent {
    width: 900px;
    height: 810px;
    margin: auto auto;
    .Img {
      width: 400px;
      height: 400px;
      //   border: 1px solid black;
      float: left;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .goods {
      width: 500px;
      height: 400px;
      //   border: 1px solid black;
      background-color: white;
      float: left;
      .title {
        text-align: center;
        font-size: 22px;
        margin-top: 20px;
      }
      .content {
        border-top: 1px solid black;
        border-bottom: 1px solid black;
        width: 500px;
        height: 200px;
        margin-top: 20px;
        padding: 20px 20px;
        text-indent: 2em;
        word-break: break-all;
        font-size: 18px;
        font-family: "楷体";
      }
      .other {
        margin: 30px auto;
        font-size: 18px;
        span {
          color: red;
        }
      }
    }
    .comment {
      width: 900px;
      height: 400px;
      float: left;
    }
  }
}
</style>
