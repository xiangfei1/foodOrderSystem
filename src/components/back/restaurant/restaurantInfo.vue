<template>
  <div class="resInfo">
    <!-- 导航栏 -->
    <topnavbar></topnavbar>
    <navbar  :index="'1'"></navbar>
    <div class="allinfo">
      <!-- 轮播图 -->
      <div class="block">
        <el-carousel trigger="click" height="300px">
          <el-carousel-item v-for="(item,index) in imagelist" :key="index">
            <img :src="item.url" alt />
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 修改 -->
      <el-dialog title="修改信息" :visible.sync="dialogVisible" width="30%">
        <el-form :label-position="labelPosition" label-width="80px">
          <el-form-item label="名称">
            <el-input v-model="resInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="餐馆详情">
            <el-input type="textarea" rows="10" v-model="resInfo.rHistory"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateResInfo()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 主体信息 -->
      <el-button type="primary" @click="dialogVisible = true">修改</el-button>
      <div class="text">
        <h2>{{ resInfo.name }}</h2>
        <p class="history">{{ resInfo.rHistory }}</p>
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
      imagelist: [
        {
          url: "static/img/food1.jpg"
        },
        {
          url: "static/img/food2.jpg"
        },
        {
          url: "static/img/food3.jpg"
        }
      ],
      resInfo: {},
      dialogVisible: false,
      labelPosition: "left",
    };
  },
  mounted() {
    this.getResInfo();
  },
  methods: {
    getResInfo() {
      this.$http.post("/api/restaurantInfo").then(resp => {
        // console.log(resp)
        if (resp.status == 200) {
          if (resp.body.length == 1) {
            this.resInfo = resp.body[0];
          } else {
            alert("获取数据失败");
          }
        }
      });
    },
    updateResInfo() {
      let resInfoParams = {
        name: this.resInfo.name,
        rHistory: this.resInfo.rHistory
      };
      this.$http
        .post("/api/restaurantInfo/update", resInfoParams)
        .then(resp => {
          if (resp.status == 200) {
            if (resp.body == 1) {
              this.dialogVisible = false;
              alert("更新成功");
            } else {
              this.dialogVisible = true;
              alert("更新失败");
            }
          } else {
            this.dialogVisible = true;
            alert("更新失败");
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
.resInfo {
  margin-top: 52px;
  display: flex;
  height: 700px;
  img {
    width: 100%;
    height: 100%;
  }
  .allinfo {
    .block {
      width: 700px;
      height: 300px;
      margin: auto auto;
      .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
      }

      .el-carousel__item:nth-child(2n) {
        background-color: #85aee7;
      }

      .el-carousel__item:nth-child(2n + 1) {
        background-color: #90baeb;
      }
    }

    .text {
      width: 1200px;
      padding: 10px;
      margin-top: 20px;
      background-color: rgb(197, 192, 192);
      .history {
        font-size: 22px;
        font-family: "楷体";
      }
    }
    width: 1320px;
    height: 700px;
  }
}
</style>