<template>
  <div class="goodsDetail">
    <div class="goodsDetail-container">
      <div class="info" v-for="(item, index) in goodsInfo" :key="index">
        <div class="img">
          <img :src="item.url" alt />
        </div>
        <div class="imgInfo">
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
      <div class="pageOption">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="currentPage"
          :total="totalPage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      goodsInfo: [],
      index: 0,
      name: this.activeName,
      page: 1, //页码
      pageSize: 4, //每一页的数据量
      totalPage: 0 //总页数
    };
  },
  watch: {
    //监听分类名称的变化
    activeName(val) {
      this.name = val; //新值替换旧值
      this.currentPage(1);
      this.getGoodsInfo(this.name, this.page);
    }
  },
  mounted() {
    this.getGoodsInfo(this.name, this.page);
  },
  methods: {
    getGoodsInfo(name, pageNo) {
      this.page = pageNo || this.page;
      this.$http
        .post("/api/goodsInfo/byClassify", {
          gClassify: name,
          page: this.page,
          pageSize: this.pageSize
        })
        .then(resp => {
          if (resp.status == 200) {
            this.goodsInfo = resp.body.data;
            this.totalPage =
              Math.ceil(parseInt(resp.body.length) / parseInt(this.pageSize)) *
              10;
          }
        });
    },
    currentPage(currentPage) {
      // console.log(this.totalPage)
      if (this.totalPage == 10) {
        this.getGoodsInfo(this.name, 1);
      } else {
        this.getGoodsInfo(this.name, currentPage);
      }
    },
    toGoodsInfo(id) {
      this.$router.push({ name: "goodsinfo", params: { gID: id } });
    }
  },
  props: ["activeName"]
};
</script>

<style lang="scss">
.goodsDetail {
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }
  width: 725px;
  height: 500px;
  margin: auto auto;
  .goodsDetail-container {
    width: 725px;
    height: 445px;
    overflow: hidden;
    position: relative;
    .info {
      width: 345px;
      height: 180px;
      float: left;
      transition: all 0.5s;
      margin-right: 10px;
      margin-bottom: 20px;
      .img {
        width: 245px;
        height: 186px;
        float: left;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .imgInfo {
        width: 100px;
        height: 186px;
        background-color: #fff;
        float: right;
        position: relative;
        .title {
          margin: 20px auto 0;
          font-size: 20px;
          font-family: "楷体";
          color: black;
        }
        .price {
          margin: 20px auto 0;
          font-size: 16px;
          color: red;
        }
        .details {
          position: absolute;
          bottom: 10px;
        }
      }
    }
    .info:hover {
      transform: translateY(10px);
      box-shadow: 5px 5px 5px rgba(109, 123, 121, 1);
    }
  }
  .pageOption {
    position: absolute;
    bottom: 10px;
  }
}
</style>
