<template>
  <div class="shopCar">
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
        v-if="userID == '[]' || userID == null"
        v-cloak
      ></el-menu-item>
      <el-menu-item v-else @click="toUserInfo()" v-cloak>用户信息</el-menu-item>
    </el-menu>
    <!-- 订单内容 -->
    <div v-if="userID == '[]' || userID == null" class="other" v-cloak>
      <h3>还没登录呢！</h3>
    </div>
    <div class="pay-content" v-else-if="paysInfo.length != 0" v-cloak>
      <div class="pay-list" v-for="(item, index) in paysInfo" :key="index">
        <el-tooltip
          class="item"
          effect="dark"
          content="不想买了"
          placement="top-end"
        >
          <el-button
            class="del"
            type="danger"
            icon="el-icon-delete"
            v-if="item.state == '0'"
            @click="open2(item.pID)"
            circle
          ></el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="申请售后"
          placement="top-end"
        >
          <el-button
            class="del"
            type="primary"
            @click="
              drawer2 = true;
              drawbackID = item.pID;
            "
            icon="el-icon-s-comment"
            v-if="item.state == '1'"
            circle
          ></el-button>
        </el-tooltip>
        <div class="pay-img" @click="toGoodsInfo(item.gID)">
          <img :src="item.url" alt />
        </div>
        <div class="pay-info">
          <p class="pay-title">{{ item.name }}</p>
          <hr />
          <div class="pay-judge">
            <div class="pay-judge-container">
              <i class="el-icon-caret-right"></i>
              价格:
              <span>{{ item.gPrice * item.num }}￥</span>
            </div>
            <div class="pay-judge-container">
              <i class="el-icon-caret-right"></i>
              购买数量:
              <span>{{ item.num }}</span>
            </div>
            <div class="pay-judge-container">
              <i class="el-icon-caret-right"></i>
              付款情况:
              <span v-if="item.state == '1'">已付款</span>
              <span v-else>待付款</span>
            </div>
            <div class="pay-judge-container" style="width:280px;">
              <i class="el-icon-caret-right"></i>
              配送信息:
              <span>{{ item.info }}</span>
            </div>
          </div>
        </div>
        <hr />
        <div class="pay-btn">
          <div class="btn">
            <el-button
              type="danger"
              v-if="item.state == '0'"
              @click="toPay(item.pID, item.gID, item.num, item.gPrice)"
              round
              >立即付款</el-button
            >
            <el-button
              type="primary"
              v-if="item.state == '1'"
              @click="
                drawer = true;
                getComment(item.gID);
              "
              round
              >查看评论</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <div v-else v-cloak>
      <h2>购物车中还没商品呢，赶快去添加吧！</h2>
    </div>
    <!-- 评论信息 -->
    <el-drawer
      title="商品评论"
      :visible.sync="drawer"
      :direction="direction"
      size="50%"
    >
      <div class="allComment">
        <div class="say">
          <textarea
            cols="67"
            placeholder="输入您的评价吧"
            v-model="msg"
            rows="8"
          ></textarea>
          <el-rate v-model="value" :colors="colors"></el-rate>
          <el-button type="primary" @click="toComment()" round
            >发表评论</el-button
          >
        </div>
        <div class="cmt-list" v-if="cmtInfo.length != 0">
          <div class="cmt-item" v-for="(item, index) in cmtInfo">
            <div class="cmt-title">
              第{{ index + 1 }}楼 &nbsp;&nbsp;&nbsp;&nbsp;用户：
              {{ item.cname }}
              <span style="float: right;"
                >发表时间：{{ item.cTime | dateFormat }}</span
              >
            </div>
            <div class="cmt-body">{{ item.content }}</div>
          </div>
        </div>
        <div class="other" v-else>
          <h4>该商品暂无评论</h4>
        </div>
      </div>
    </el-drawer>
    <!-- 售后信息 -->
    <el-drawer
      title="申请售后"
      :visible.sync="drawer2"
      :direction="direction"
      size="50%"
    >
      <div class="drawback">
        <textarea
          cols="67"
          placeholder="真的吗？人为因素可不能售后成功，请三思而后行哦"
          v-model="msg2"
          rows="8"
        ></textarea>
        <el-button type="primary" @click="toDrawback()" round>提交</el-button>
      </div>
    </el-drawer>
    <!-- 退款信息 -->
  </div>
</template>

<script>
export default {
  inject: ["reload"], //页面刷新
  data() {
    return {
      userID: localStorage.getItem("userID"),
      uname: localStorage.getItem("uname"),
      paysInfo: [],
      direction: "btt",
      drawer: false, //评论弹框
      drawer2: false, //售后弹框
      cmtInfo: [], //所有的评论信息
      msg: "", //评论内容
      gID: "", //商品ID
      value: null,
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      drawbackID: "",
      msg2: "", //售后内容
      userInfo: {} //用户信息
    };
  },
  mounted() {
    this.getPaysInfo();
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
      if (userID != null) {
        this.$router.push({ name: "userInfo", params: { id: userID } });
      }
    },
    // 跳转商品详情页面
    toGoodsInfo(id) {
      this.$router.push({ name: "goodsinfo", params: { gID: id } });
    },

    // 获取用户详细信息
    getUserInfo() {
      let id = this.userID;
      this.$http.post("/api/userInfo", { userID: id }).then(resp => {
        if (resp.status == 200) {
          this.userInfo = resp.body[0];
        }
      });
    },
    // 获取用户订单详情
    getPaysInfo() {
      let userID = this.userID;
      this.$http.post("/api/payInfo", { userID: userID }).then(resp => {
        if (resp.status == 200) {
          this.paysInfo = resp.body;
        }
      });
    },
    // 删除提示
    open2(id) {
      this.$confirm("请确认是否删除订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deletePay(id);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 立即付款
    toPay(pID, gID, num, gPrice) {
      let _this = this;
      // console.log(this.userInfo.money)
      let price = parseInt(this.userInfo.money) - num * gPrice;
      // console.log(price)
      if (price < 0) {
        alert("用户余额不足");
        return;
      } else {
        this.$http.post("/api/topay", { pID: pID }).then(resp => {
          if (resp.status == 200) {
            if (resp.body == 1) {
              _this.$http
                .post("/api/goodsInfoByid", { gID, gID })
                .then(res1 => {
                  let newNum = parseInt(res1.body[0].num) - num;
                  // console.log(newNum)
                  _this.$http
                    .post("/api/goodsInfo/upate/num", { gID: gID, num: newNum })
                    .then(res2 => {
                      if (res2.status == 200) {
                        console.log("数量已变");
                      }
                    });
                  _this.$http
                    .post("/api/userInfo/update/money", {
                      userID: this.userID,
                      money: price
                    })
                    .then(res3 => {
                      if (res3.body == 1) {
                        alert("付款成功");
                        this.getUserInfo();
                        this.reload();
                      }
                    });
                });
              // this.reload();
            }
          }
        });
      }
    },

    // 删除订单
    deletePay(id) {
      this.$http.post("/api/pay/delete", { pID: id }).then(resp => {
        if (resp.status == 200) {
          if (resp.body == 1) {
            // alert("删除成功");
            this.reload();
          }
        }
      });
    },
    // 获取商品评论信息
    getComment(id) {
      this.gID = id;
      this.$http.post("/api/comment", { gID: id }).then(resp => {
        if (resp.status == 200) {
          this.cmtInfo = resp.body;
        }
      });
    },
    // 发表评论
    toComment() {
      let cparam = {
        cTime: new Date(),
        cname: this.uname,
        content: this.msg,
        gID: this.gID,
        value: this.value
      };
      if (this.msg == "" || this.value == 0) {
        this.open();
      } else {
        this.$http.post("/api/comment/add", { cparam: cparam }).then(resp => {
          if (resp.body == 1) {
            this.getComment(this.gID);
            this.msg = "";
            this.value = null;
          }
        });
      }
    },
    // 消息提示
    open() {
      this.$message({
        message: "警告哦，评论或者等级不能为空",
        type: "warning",
        showClose: true
      });
    },
    // 申请售后
    toDrawback() {
      if (this.msg2 == "") {
        alert("内容不能为空哦");
      } else {
        this.$http
          .post("/api/pay/drawback", {
            pID: this.drawbackID,
            drawback: this.msg2
          })
          .then(resp => {
            if (resp.body == 1) {
              alert("提交成功");
              this.msg2 = "";
            }
          });
      }
    }
  }
};
</script>

<style lang="scss">
.allComment {
  display: flex;
  .say {
    width: 500px;
    height: 200px;
    margin-left: 10px;
    textarea {
      text-indent: 2em;
    }
  }
  .cmt-list {
    margin-left: 20px;
    width: 600px;
    height: 250px;
    .cmt-title {
      background-color: #ccc;
    }
  }
}
.drawback {
  width: 500px;
  height: 250px;
  margin-left: 20px;
}
[v-cloak] {
  display: none !important;
}
.shopCar {
  background-color: #fbfbfb;
  height: 900px;
  .other {
    width: 180px;
    height: 50px;
    margin: auto auto;
  }
  .right {
    float: right;
  }
  .pay-content {
    width: 1117px;
    height: 800px;
    margin: 20px auto 0;
    padding: 10px 10px;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    .pay-list {
      width: 250px;
      height: 395px;
      border: 1px solid rgb(128, 124, 124);
      background-color: white;
      border-radius: 15px;
      overflow: hidden;
      margin-left: 20px;
      position: relative;
      .el-button.is-circle {
        padding: 10px;
      }
      .del {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 999;
      }
      .pay-img {
        height: 150px;
        // width: 300px;
        overflow: hidden;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          transition: all 0.5s;
        }
        img:hover {
          transform: scale(1.1);
        }
      }
      .pay-info {
        width: 250px;
        height: 165px;
        .pay-title {
          font-size: 18px;
          text-align: center;
        }
        .pay-judge {
          height: 100px;
          .pay-judge-container {
            margin: 5px 0px;
            width: 146px;
            height: 20px;
            line-height: 20px;
            float: left;
          }
          span {
            color: red;
          }
        }
      }
      .pay-btn {
        width: 250px;
        height: 50px;
        .btn {
          width: 250px;
          height: 55px;
          margin: auto auto;
        }
      }
    }
  }
}
</style>
