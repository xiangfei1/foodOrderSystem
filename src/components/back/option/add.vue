<template>
  <div class="newAdd">
    <!-- 导航栏 -->
    <nav class="navbar navbar-fixed-top navbar-inverse">
      <div class="container">
        <div class="navbar-header">
          <router-link class="navbar-brand" :to="'/restaurantinfo'"
            >外卖点餐系统</router-link
          >
        </div>
      </div>
    </nav>
    <!-- 添加内容 -->
    <div class="content">
      <el-form
        label-width="80px"
        :rules="rules"
        :model="goodsAdd"
        ref="goodsAdd"
      >
        <el-form-item label="商品数量" prop="num">
          <el-input v-model="goodsAdd.num"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="goodsAdd.name"></el-input>
        </el-form-item>
        <el-form-item label="商品信息" prop="gInfo">
          <el-input type="textarea" v-model="goodsAdd.gInfo"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="gClassify">
          <el-select
            v-model="goodsAdd.gClassify"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.cname"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片URL" prop="url">
          <el-input type="textarea" v-model="goodsAdd.url" ></el-input>
          <input type="file" accept=".jpg, .jpeg, .png" ref="url" />
        </el-form-item>
        <el-form-item label="适合年龄" prop="gAge">
          <el-input v-model="goodsAdd.gAge"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="gPrice">
          <el-input v-model="goodsAdd.gPrice"></el-input>
        </el-form-item>
        <el-form-item label="是否促销" prop="cID">
          <el-select v-model="goodsAdd.cID" clearable placeholder="请选择">
            <el-option
              v-for="item in sales"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button @click="getBack()">返 回</el-button>
      <el-button type="primary" @click="goodsInfoAdd(goodsAdd)"
        >确 定</el-button
      >
    </div>
  </div>
</template>

<script>
import { ImageURL } from "@/assets/js/constant";
export default {
  data() {
    return {
      goodsAdd: {
        num: "",
        name: "",
        gInfo: "",
        gClassify: "",
        url: "",
        gAge: "",
        gPrice: "",
        cID: ""
      },
      options: [],
      rules: {
        num: [{ required: true, message: "请输入商品数量", trigger: "blur" }],
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        gInfo: [{ required: true, message: "请输入商品介绍", trigger: "blur" }],
        gClassify: [
          { required: true, message: "请输入商品分类", trigger: "blur" }
        ],
        gAge: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        gPrice: [{ required: true, message: "请输入价格", trigger: "blur" }],
        cID: [{ required: true, message: "是否促销", trigger: "blur" }]
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
      ]
    };
  },
  mounted() {
    this.getClassify();
  },
  methods: {
    goodsInfoAdd(goodsAdd) {
      let _this = this;
      let arr = this.$refs.url.value.split("\\");
      let url = ImageURL + arr[arr.length - 1];
      goodsAdd.url = url;
      this.$refs.goodsAdd.validate(valid => {
        if (valid) {
             if (arr == "") {
                alert("您还没有输入图片呢！");
              } else {
                _this.$http
                  .post("/api/goodsInfo/add", { goodsParam: goodsAdd })
                  .then(resp => {
                    if (resp.body == 1) {
                      alert("添加成功");
                      _this.goodsAdd = {
                        num: "",
                        name: "",
                        gInfo: "",
                        gClassify: "",
                        url: "",
                        gAge: "",
                        gPrice: "",
                        cID: ""
                      };
                    } else {
                      alert("再仔细检查下！");
                    }
                  });
              }
        }
      });
    },
    getClassify() {
      this.$http.get("/api/goodsInfo/classifyInfo").then(resp => {
        if (resp.status == 200) {
          // console.log(resp)
          this.options = resp.body;
        }
      });
    },
    getBack() {
      this.$router.push({ name: "resGoods" });
    }
  }
};
</script>

<style lang="scss">
.newAdd {
  margin-top: 60px;
  .content {
    width: 500px;
    height: 560px;
    margin: auto auto;
  }
}
</style>
