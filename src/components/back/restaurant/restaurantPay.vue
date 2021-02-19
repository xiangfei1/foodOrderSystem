<template>
  <div class="restaurantPay">
    <!-- 导航栏 -->
    <topnavbar :id="id"></topnavbar>
    <navbar :id="id" :index="'3'"></navbar>

    <!-- 付款信息 -->
    <div class="pay-content">
      <p class="title">
        <span>用户付款信息</span>
      </p>
      <div class="pay-name">
        <div
          class="pay-name-info"
          v-for="(item, index) in usersInfo"
          :key="index"
          @click="
            getPaysInfo(item.userID);
            getUserInfoByid(item.userID);
          "
        >
          {{ item.uname }}
        </div>
      </div>
      <div class="pay-info">
        <div class="user-info">
          <p class="tel">
            <i class="el-icon-phone-outline"></i>
            <span v-if="uname != ''" v-cloak>姓名：{{ uname }}</span>
            <span v-else v-cloak>姓名：暂未选择</span>
          </p>
          <p class="tel">
            <i class="el-icon-phone-outline"></i>
            <span v-if="tel != ''" v-cloak>电话：{{ tel }}</span>
            <span v-else v-cloak>电话：暂未填写</span>
          </p>
          <p class="tel">
            <i class="el-icon-truck"></i>
            <span v-if="address != ''" v-cloak>住址：{{ address }}</span>
            <span v-else v-cloak>住址：暂未填写</span>
          </p>
        </div>
        <h3>购买商品</h3>
        <hr />
        <div v-if="paysInfo.length == 0" v-cloak>
          <h3>该用户尚未购买商品</h3>
        </div>
        <div
          class="goods-info"
          v-for="(item, index) in paysInfo"
          :key="index"
          v-else
          v-cloak
        >
          <div class="goodsImg">
            <img :src="item.url" alt />
          </div>
          <div class="goodInfo">
            <div class="drawback" v-if="item.drawback != ''">
              <marquee
                onmouseover="this.stop()"
                onmouseout="this.start()"
                direction="right"
                behavior="scroll"
                >{{ item.drawback }}</marquee
              >
            </div>
            <div class="goodInfo-title">
              <i class="el-icon-caret-right"></i>商品名称：
              <span style="font-size: 18px;">{{ item.name }}</span>
            </div>
            <div class="goodInfo-content">
              <div class="goodInfo-content-item">
                <i class="el-icon-caret-right"></i>购买数量：
                <span>{{ item.num }}</span>
              </div>
              <div class="goodInfo-content-item">
                <i class="el-icon-caret-right"></i>付款情况：
                <span v-if="item.state == '1'" v-cloak>已付款({{item.gPrice * item.num}}元)</span>
                <span v-else v-cloak>待付款({{item.gPrice * item.num}}元)</span>
              </div>
              <div class="goodInfo-content-item">
                <i class="el-icon-caret-right"></i>配送情况：
                <span>{{ item.info }}</span>
              </div>
              <div class="goodInfo-content-item">
                <i class="el-icon-caret-right"></i>商品号：
                <span>{{ item.gID }}</span>
              </div>
              <div class="goodInfo-content-item">
                <i class="el-icon-caret-right"></i>下单时间：
                <span>{{ item.sTime | dateFormat }}</span>
              </div>
              <el-select
                v-if="item.info == '等待配送'"
                v-model="value"
                placeholder="配送员"
              >
                <el-option
                  v-for="(item, index) in Dispatcher"
                  :key="index"
                  :label="item.name"
                  :value="item.name + ':' + item.delTel"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="goods-btn">
            <button
              type="button"
              @click="delivery(item.pID, item.userID)"
              v-if="item.info == '等待配送'"
              v-cloak
              class="layui-btn layui-btn-radius layui-btn-danger"
            >
              确认发货
            </button>
            <br />
            <br />
            <button
              type="button"
              class="layui-btn layui-btn-radius layui-btn-danger"
              @click="deleteByid(item.pID, item.userID)"
            >
              删除订单
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "@/components/back/subcomponents/navbar";
import topnavbar from "@/components/back/subcomponents/topnavbar";
export default {
  data() {
    return {
      id: this.$route.params.id, // 连接ID
      usersInfo: [], //总用户信息
      paysInfo: [], //用户付款信息
      tel: "", //电话
      address: "", //住址
      uname: "", //用户信息
      Dispatcher: [],
      value: ""
    };
  },
  mounted() {
    this.getUsersInfo();
    this.getAllDeliver();
  },
  methods: {
    //获取所有用户信息
    getUsersInfo() {
      this.$http.post("/api/alluserinfo").then(resp => {
        if (resp.status == 200) {
          this.usersInfo = resp.body;
        }
      });
    },
    //获取订单信息
    getPaysInfo(id) {
      this.$http.post("/api/payInfo", { userID: id }).then(resp => {
        if (resp.status == 200) {
          this.paysInfo = resp.body;
        }
      });
    },
    //获取个人用户信息
    getUserInfoByid(id) {
      this.$http.post("/api/userinfo", { userID: id }).then(resp => {
        if (resp.status == 200) {
          this.tel = resp.body[0].tel;
          this.address = resp.body[0].address;
          this.uname = resp.body[0].uname;
        }
      });
    },
    // 确认发货
    delivery(id, userID) {
      let info = this.value;
      if (info == "") {
        alert("还没选择配送员呢");
      } else {
        this.$http
          .post("/api/pay/update", { pID: id, info: info })
          .then(resp => {
            if (resp.body == 1) {
              this.getPaysInfo(userID);
              alert("发货成功");
            }
          });
      }
    },
    // 删除订单
    deleteByid(id, userID) {
      this.$http.post("/api/pay/delete", { pID: id }).then(resp => {
        if (resp.body == 1) {
          this.getPaysInfo(userID);
          alert("删除成功");
        }
      });
    },
    // 获取所有配送员信息
    getAllDeliver() {
      this.$http.post("/api/deliver").then(resp => {
        if (resp.status == 200) {
          this.Dispatcher = resp.body;
        }
      });
    }
  },
  components: {
    navbar,
    topnavbar
  }
};
</script>

<style lang="scss">
[v-cloak] {
  display: none;
}
.restaurantPay {
  height: 700px;
  margin-top: 52px;
  display: flex;
  .pay-content {
    margin-left: 10px;
    width: 1160px;
    height: 600px;
    background-color: burlywood;
    display: flex;
    flex-wrap: wrap;
    .title {
      font-size: 28px;
      width: 35px;
      height: 600px;
      text-align: center;
      vertical-align: middle;
      padding: 200px 0;
    }
    .pay-name {
      width: 250px;
      height: 600px;
      background-color: azure;
      .pay-name-info {
        border-left: 2px solid #009688;
        background-color: #f2f2f2;
        height: 50px;
        width: 250px;
        margin-bottom: 10px;
        text-align: center;
        line-height: 50px;
        font-size: 18px;
        cursor: pointer;
      }
    }
    .pay-info {
      width: 875px;
      height: 600px;
      background-color: cornsilk;
      overflow-y: auto;
      .user-info {
        width: 500px;
        height: 120px;
        margin: 10px 10px;
        background-color: white;
        .tel {
          height: 40px;
          font-size: 20px;
          line-height: 40px;
        }
      }
      .goods-info {
        height: 150px;
        margin: 10px 10px;
        background-color: white;
        display: flex;
        .goodsImg {
          width: 220px;
          height: 150px;
          background-color: azure;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .goodInfo {
          width: 600px;
          height: 150px;
          padding: 10px 10px;
          background-color: azure;
          position: relative;
          span {
            font-size: 16px;
            color: red;
          }
          .goodInfo-title {
            width: 300px;
          }
          .goodInfo-content {
            width: 520px;
            .goodInfo-content-item {
              float: left;
              width: 250px;
              height: 20px;
              margin: 5px 0;
            }
          }
          .drawback {
            position: absolute;
            top: 0;
            right: 0;
            width: 115px;
            height: 40px;
            line-height: 40px;
            background-color: violet;
            font-size: 18px;
          }
        }
        .goods-btn {
          height: 150px;
          width: 100px;
          padding-top: 25px;
        }
      }
    }
    .pay-btn {
      margin-left: 35px;
    }
  }
}
</style>
