<template>
  <div class="comment">
    <!-- 导航栏 -->
    <nav class="navbar navbar-fixed-top navbar-inverse">
      <div class="container">
        <div class="navbar-header">
          <router-link class="navbar-brand" :to="'/restaurantinfo'">外卖点餐系统</router-link>
        </div>
      </div>
    </nav>
    <div class="content">
      <!-- 评论等级 -->
      <div class="cmtTitle">
        <div class="cmtImg">
          <img :src="goods.url" alt />
        </div>
        <div class="cmtScore">
          <p class="title">{{ goods.name }}</p>
          <hr />
          <p>评定等级：</p>
          <el-rate v-model="value" :colors="colors" disabled="true"></el-rate>
          <p>得分情况：</p>
          <span class="grade" v-if="this.value!=0" v-cloak>{{ this.value }}</span>
          <span class="grade" v-else v-cloak>暂无评价</span>
          <hr />
          <el-button
            size="medium"
            type="primary"
            v-if="flag==0"
            v-cloak
            @click="recommend()"
            round
          >推荐首页</el-button>
          <el-button size="medium" type="danger" v-else v-cloak @click="delRecommend()" round>移出推荐</el-button>
        </div>
      </div>
      <!-- 评论内容 -->
      <div class="cmtList">
        <div class="cmt-item" v-for="(item,index) in comments" :key="index">
          <div class="cmt-title">
            第{{ index+1 }}楼 &nbsp;&nbsp;&nbsp;&nbsp;用户：{{ item.cname }}
            <span
              style="float:right;"
            >发表时间：{{ item.cTime | dateFormat}}</span>
          </div>
          <div class="cmt-body">{{ item.content }}</div>
        </div>
      </div>
      <!-- 按钮组 -->
      <div class="cmt-btn">
        <el-button @click="getBack()" plain>返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"], //页面刷新
  data() {
    return {
      gID: this.$route.params.gID, //商品ID
      value: null,
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      goods: {},
      flag: "", //推荐表信息
      comments: [] //商品所有评论信息
    };
  },
  mounted() {
    this.getCommentByID();
    this.getGoods();
    this.getRecommendByid();
  },
  methods: {
    // 返回商品信息页面
    getBack() {
      this.$router.push({ name: "resGoods"});
    },
    // 获取商品信息
    getGoods() {
      this.$http.post("/api/goodsInfoByid", { gID: this.gID }).then(resp => {
        if (resp.status == 200) {
          this.goods = resp.body[0];
          // console.log(this.goods)
        }
      });
    },
    // 根据商品ID获取评论信息
    getCommentByID() {
      let sum;
      // console.log(this.gID)
      this.$http.post("/api/comment", { gID: this.gID }).then(resp => {
        if (resp.status == 200) {
          this.comments = resp.body;
          if (this.comments.length != 0) {
            for (let i = 0; i < this.comments.length; i++) {
              sum = this.value += this.comments[i].value;
            }
            this.value = Math.round(sum / this.comments.length);
          }
        }
      });
    },
    // 推荐首页
    recommend() {
      this.$http
        .post("/api/recommend/add", { gID: this.gID })
        .then(res => {
          if (res.body == 1) {
            alert("成功推荐");
            this.reload();
          }
        });
    },
    // 根据商品ID 查询推荐信息
    getRecommendByid() {
      // console.log(this.gID)
      this.$http.post("/api/recommendByid", { gID: this.gID }).then(resp => {
        if (resp.status == 200) {
          this.flag = resp.body[0].tID;
          // console.log(this.flag)
        }
      });
    },
    // 删除推荐
    delRecommend() {
      this.$http.post("/api/recommend/delete", { gID: this.gID }).then(resp => {
        if (resp.body == 1) {
          alert("已从推荐中移除哦");
          this.reload();
        }
      });
    }
  }
};
</script>

<style lang="scss">
[v-cloak] {
  display: none;
}
.comment {
  height: 700px;
  .content {
    width: 800px;
    height: 600px;
    background-color: wheat;
    margin: 60px auto 0;
    .cmtTitle {
      width: 800px;
      height: 300px;
      background-color: tan;
      display: flex;
      .cmtImg {
        width: 550px;
        height: 300px;
        background-color: rgb(110, 75, 29);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .cmtScore {
        width: 250px;
        height: 300px;
        background-color: #82c4c6;
        .el-rate__icon {
          font-size: 36px;
        }
        .el-rate {
          height: 40px;
        }
        p {
          font-size: 22px;
        }
        .title {
          width: 250px;
          height: 50px;
          text-align: center;
          padding: 10px 0;
        }
        .grade {
          display: inline-block;
          width: 250px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          font-size: 18px;
        }
      }
    }
    .cmtList {
      height: 300px;
      width: 800px;
      .cmt-item {
        font-size: 16px;
        .cmt-title {
          background-color: #ccc;
        }
      }
    }
  }
}
</style>