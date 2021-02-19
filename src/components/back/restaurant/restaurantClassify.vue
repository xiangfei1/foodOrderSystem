<template>
  <div class="resClassify">
    <topnavbar></topnavbar>
    <navbar :index="'6'"></navbar>
    <div class="classify">
      <div class="classify-content">
        <el-table style="width: 100%" :data="classifyArr">
          <el-table-column label="编号" width="100">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.value }}</span>
            </template>
          </el-table-column>
          <el-table-column label="分类名" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.cname }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="
                  dialogFormVisible2 = true;
                  getClassifyByID(scope.row.value);
                "
                >编辑</el-button
              >
              <!-- <el-button size="mini" type="danger" @click="deleteClassify(scope.row.value)">删除</el-button> -->
              <el-button type="danger" size="mini" @click="open(scope.row.value)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-button size="medium" type="primary" @click="dialogFormVisible = true"
        >添加</el-button
      >
    </div>
    <!-- 添加弹框 -->
    <el-dialog title="分类信息" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        :label-position="labelPosition"
        :model="cname"
        ref="cname"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="分类名" prop="name">
          <el-input v-model="cname.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addClassify()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹框 -->
    <el-dialog
      title="分类信息"
      :visible.sync="dialogFormVisible2"
      width="500px"
    >
      <el-form :label-position="labelPosition" label-width="80px">
        <el-form-item label="分类名">
          <el-input v-model="classify.cname"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            dialogFormVisible2 = false;
            updateClassify();
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 删除弹框 -->
    
  </div>
</template>

<script>
import navbar from "@/components/back/subcomponents/navbar";
import topnavbar from "@/components/back/subcomponents/topnavbar";
export default {
  data() {
    return {
      classifyArr: [], //分类信息
      dialogFormVisible: false, //弹框flag
      dialogFormVisible2: false, //弹框flag
      rules: {
        name: [{ required: true, message: "分类名不能为空", trigger: "blur" }]
      },
      cname: {
        name: ""
      }, //分类名
      labelPosition: "right",
      classify: {} //个别分类信息
    };
  },
  mounted() {
    this.getClassify();
  },
  methods: {
    open(id) {
        this.$confirm('该分类可能包含商品，删除的同时会清除商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteClassify(id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },

    //   获取所有分类信息
    getClassify() {
      this.$http.get("/api/goodsInfo/classifyInfo").then(resp => {
        if (resp.status == 200) {
          this.classifyArr = resp.body;
        }
      });
    },
    //   根据ID 获取分类信息
    getClassifyByID(id) {
      this.$http
        .post("/api/goodsInfo/classifyInfoByID", { value: id })
        .then(resp => {
          if (resp.status == 200) {
            this.classify = resp.body[0];
          }
        });
    },
    // 添加分类
    addClassify() {
      this.$refs.cname.validate(valid => {
        if (valid) {
          this.$http
            .post("/api/goodsInfo/classifyInfo/add", { cname: this.cname.name })
            .then(resp => {
              if (resp.body == 1) {
                alert("添加成功");
                this.getClassify();
                this.cname = {
                    name: ""
                };
              }
            });
        }
      });
    },
    // 删除分类
    deleteClassify(id) {
      let _this = this
        this.$http.post("/api/goodsInfo/classifyInfo/delete",{value: id}).then(resp=>{
            if(resp.body == 1) {
              _this.$http.post("/api/goodsInfo/deleteByClassify",{value: id}).then(res=>{
                if(resp.body == 1) {
                  this.getClassify();
                }
              })
            }
        })
    },
    // 更新分类
    updateClassify() {
        this.$http.post("/api/goodsInfo/classifyInfo/update",{param: this.classify}).then(resp=>{
            if(resp.body == 1) {
                alert("更新成功")
                this.getClassify();
            }
        })
    }
  },
  components: {
    navbar,
    topnavbar
  }
};
</script>

<style lang="scss" scoped>
.resClassify {
  margin-top: 52px;
  display: flex;
  .classify {
    width: 455px;
    height: 400px;
    margin-left: 10px;
  }
}
</style>
