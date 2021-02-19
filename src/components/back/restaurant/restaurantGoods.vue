<template>
  <div class="restaurantGoods">
    <!-- 导航栏 -->
    <topnavbar></topnavbar>
    <navbar :index="'2'"></navbar>

    <!-- 商品信息内容 -->
    <div class="content">
      <div class="goods" v-for="(item, index) in goodsInfo" :key="index">
        <!-- 图片 -->
        <div class="goodsImg">
          <img :src="item.url" alt="..." />
        </div>
        <!-- 详细信息 -->
        <div class="goodsInfo">
          <p class="goodsInfoName">
            商品名称：<span class="Name">{{ item.name }}</span>
          </p>
          <hr />
          <p class="goodsInfoData">
            <span>详细信息：</span>
            {{ item.gInfo }}
          </p>
          <hr />
          <div class="classify">
            <div class="classify-con-info">
              <i class="el-icon-caret-right"></i>
              <span>分类：{{ item.gClassify }}</span>
            </div>
            <div class="classify-con-info">
              <i class="el-icon-caret-right"></i>
              <span>适合年龄：</span>
              {{ item.gAge }}
            </div>
            <div class="classify-con-info">
              <i class="el-icon-caret-right"></i>
              <span>价格：</span>
              {{ item.gPrice }}
              <span>￥</span>
            </div>
            <div class="classify-con-info">
              <i class="el-icon-caret-right"></i>
              <span>商品ID：</span>
              {{ item.gID }}
            </div>
            <div class="classify-con-info">
              <i class="el-icon-caret-right"></i>
              <span v-if="item.cID == '0'">是否促销：否</span>
              <span v-else>是否促销：是 </span>
            </div>
            <div class="classify-con-info">
              <i class="el-icon-caret-right"></i>
              <span>商品数量：</span>
              {{ item.num }}
            </div>
          </div>
        </div>
        <!-- 按钮组 -->
        <div class="button">
          <el-tooltip
            class="item"
            effect="dark"
            content="修改商品信息"
            placement="right"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="getUpdate(item.gID)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="删除商品信息"
            placement="right"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="open(item.gID)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="查看评论信息"
            placement="right"
          >
            <el-button
              type="info"
              icon="el-icon-star-on"
              @click="getComment(item.gID)"
            ></el-button>
          </el-tooltip>
        </div>
      </div>
    </div>
    <!-- 添加按钮 -->
    <div class="elbtn">
      <el-tooltip
        class="item"
        effect="dark"
        content="添加商品"
        placement="right"
      >
        <el-button
          class="add"
          type="primary"
          icon="el-icon-circle-plus"
          @click="getAdd()"
        ></el-button>
      </el-tooltip>
      <!-- 分类 -->
      <div class="elclassify">
        <el-tabs
          :tab-position="tabPosition"
          v-model="activeName"
          style="height: 300px;"
        >
          <el-tab-pane label="全部" name="全部"></el-tab-pane>
          <el-tab-pane
            v-for="item in classifyArr"
            :key="item.value"
            :label="item.cname"
            :name="item.cname"
          ></el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "@/components/back/subcomponents/navbar";
import topnavbar from "@/components/back/subcomponents/topnavbar";
export default {
  inject: ["reload"], //页面刷新
  data() {
    return {
      goodsInfo: [],
      labelPosition: "left",
      dialogVisible3: false,
      tabPosition: "right", //导航栏右对齐
      classifyArr: [],
      activeName: "全部" //分类flag
    };
  },
  watch: {
    activeName(val) {
      this.activeName = val;
      this.getGoodsInfo(this.activeName);
    }
  },
  mounted() {
    this.getGoodsInfo(this.activeName);
    this.getClassify();
  },
  methods: {
    open(id) {
      this.$confirm("请确认是否删除该商品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.goodsDelete(id);
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
    getGoodsInfo(name) {
      this.$http.post("/api/back/goodsInfo", { cname: name }).then(resp => {
        if (resp.status == 200) {
          if (resp.body.length != 0) {
            this.goodsInfo = resp.body;
            console.log(this.goodsInfo);
          }
        } else {
          console.log("错误2");
        }
      });
    },
    goodsDelete(id) {
      // this.delRecommend(id);
      this.$http.post("/api/goodsInfo/delete", { gID: id }).then(resp => {
        if (resp.status == 200) {
          if (resp.body == 1) {
            this.reload();
          } else {
            alert("删除失败");
          }
        } else {
          alert("删除失败");
        }
      });
    },
    // 删除推荐
    // delRecommend(id) {
    //   this.$http.post("/api/recommend/delete", { gid: id }).then(resp => {
    //     if (resp.status == 200) {
    //       console.log(resp);
    //     }
    //   });
    // },
    // 获取分类信息
    getClassify() {
      this.$http.get("/api/goodsInfo/classifyInfo").then(resp => {
        if (resp.status == 200) {
          this.classifyArr = resp.body;
        }
      });
    },
    getUpdate(gid) {
      this.$router.push({ name: "update", params: { gID: gid } });
    },
    getAdd() {
      this.$router.push({ name: "add" });
    },
    getComment(gid) {
      this.$router.push({ name: "comment", params: { gID: gid } });
    }
  },
  components: {
    navbar,
    topnavbar
  }
};
</script>

<style lang="scss">
.restaurantGoods {
  margin-top: 52px;
  // height: 700px;
  display: flex;
  .elbtn {
    width: 135px;
    // height: 45px;
    .elclassify {
      margin-top: 10px;
      width: 80px;
    }
  }
  .content {
    width: 900px;
    height: 600px;
    overflow-y: auto;
    background-color: white;
    margin-left: 10px;
    .goods {
      width: 855px;
      height: 202px;
      // margin: 10px auto 0;
      border: {
        top: 1px solid black;
        bottom: 1px solid black;
      }
      .goodsInfo {
        float: left;
        width: 600px;
        height: 202px;
        span {
          font-size: 14px;
          color: brown;
        }
        hr {
          margin: 0;
        }
        .goodsInfoName {
          height: 50px;
          position: relative;
          line-height: 50px;
          .Name {
            font-size: 18px;
          }
        }
        .goodsInfoData {
          margin: 0;
          display: -webkit-box;
          max-width: 600px;
          height: 80px;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
        }
        .classify {
          margin-top: 10px;
          display: flex;
          flex-wrap: wrap;
          max-width: 500px;
          .classify-con-info {
            margin: 5px 10px;
            width: 120px;
          }
        }
      }
      .button {
        width: 55px;
        height: 202px;
        float: right;
        .el-button + .el-button {
          margin-top: 10px;
          margin-left: 0;
        }
      }
      .goodsImg {
        width: 200px;
        height: 200px;
        transition: all 0.5s;
        float: left;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .goodsImg:hover {
        transform: translate(5px 10px);
        box-shadow: 2px 5px 5px black;
      }
    }
  }
}
</style>
