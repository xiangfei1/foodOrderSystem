<template>
  <div class="update">
    <!-- 导航栏 -->
    <nav class="navbar navbar-fixed-top navbar-inverse">
      <div class="container">
        <div class="navbar-header">
          <router-link class="navbar-brand" :to="'/restaurantinfo'">外卖点餐系统</router-link>
        </div>
      </div>
    </nav>
    <!-- 更新内容 -->
    <div class="content">
      <el-form label-width="80px" :rules="rules" :model="goodsByid" ref="goodsByid">
        <el-form-item label="商品数量" prop="num">
          <el-input v-model="goodsByid.num"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="goodsByid.name"></el-input>
        </el-form-item>
        <el-form-item label="商品信息" prop="gInfo">
          <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 6}" v-model="goodsByid.gInfo"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="gClassify">
          <el-select v-model="goodsByid.gClassify" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.cname"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片URL" prop="url">
          <el-input type="textarea" v-model="goodsByid.url"></el-input>
          <input type="file" ref="url" accept=".jpg, .jpeg, .png">
        </el-form-item>
        <el-form-item label="适合年龄" prop="gAge">
          <el-input v-model="goodsByid.gAge"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="gPrice">
          <el-input v-model="goodsByid.gPrice"></el-input>
        </el-form-item>
        <el-form-item label="是否促销" prop="cID">
          <el-select v-model="goodsByid.cID" clearable placeholder="请选择">
            <el-option
              v-for="item in sales"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否推荐" prop="tID">
          <el-select v-model="goodsByid.tID" clearable placeholder="请选择">
            <el-option
              v-for="item in sales2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button @click="getBack()">返 回</el-button>
      <el-button type="primary" @click="goodsUpdate(goodsByid)">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { ImageURL } from "@/assets/js/constant";
export default {
  data() {
    return {
      gid: this.$route.params.gID,
      goodsByid: {},
      options: [],
      // value: "",
      rules: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        gInfo: [{ required: true, message: "请输入商品介绍", trigger: "blur" }],
        gClassify: [
          { required: true, message: "请输入商品分类", trigger: "blur" }
        ],
        url: [{ required: true, message: "请输入图片地址", trigger: "blur" }],
        gAge: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        gPrice: [{ required: true, message: "请输入价格", trigger: "blur" }],
        cID: [{ required: true, message: "是否促销", trigger: "blur" }],
        tID: [{ required: true, message: "是否推荐", trigger: "blur" }]
      },
      sales: [
        {
          value: "0",
          label: "否"
        },
        {
          value: "1",
          label: "是"
        }
      ],
      sales2: [
        {
          value: "0",
          label: "否"
        },
        {
          value: "1",
          label: "是"
        }
      ]
    };
  },
  mounted() {
    this.getGoodsByid();
    this.getClassify();
  },
  methods: {
    getGoodsByid() {
      let id = this.gid;
      this.$http.post("/api/goodsInfoByid", { gID: id }).then(resp => {
        if (resp.status == 200) {
          this.goodsByid = resp.body[0];
        } else {
          console.log("获取数据失败");
        }
      });
    },
    goodsUpdate(goodsByid) {
      let arr = this.$refs.url.value.split("\\");
      if(arr[arr.length-1] != "") {
        let url = ImageURL + arr[arr.length - 1];
        goodsByid.url = url
      }
      // console.log(goodsByid.gClassify)
      let params = {
        gID: goodsByid.gID,
        num: goodsByid.num,
        name: goodsByid.name,
        gInfo: goodsByid.gInfo,
        gClassify: goodsByid.gClassify,
        url: goodsByid.url,
        gAge: goodsByid.gAge,
        gPrice: goodsByid.gPrice,
        cID: goodsByid.cID,
        tID: goodsByid.tID
      };
      this.$refs.goodsByid.validate(valid => {
        if (valid) {
          this.$http.post("/api/goodsInfo/update", params).then(resp => {
            if (resp.status == 200) {
              if (resp.body == 1) {
                alert("更新成功");
                this.getGoodsByid();
              } else {
                console.log("修改失败");
              }
            } else {
              console.log("修改失败");
            }
          });
        }
      });
    },
    getClassify() {
      this.$http.get("/api/goodsInfo/classifyInfo").then(resp=>{
        if(resp.status == 200) {
          this.options = resp.body
          // console.log(this.options)
        }
      })
    },
    getBack() {
      this.$router.push({ name: "resGoods"});
    }
  }
};
</script>

<style lang="scss" scoped>
.update {
  height: 800px;
  .content {
    width: 500px;
    height: 500px;
    margin: 60px auto;
  }
}
</style>
