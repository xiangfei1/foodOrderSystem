<template>
  <div class="resdispatcher">
    <!-- 导航栏 -->
    <topnavbar :id="id"></topnavbar>
    <navbar :id="id" :index="'5'"></navbar>

    <div class="content">
      <div class="dis-info">
        <el-table style="width: 100%" :data="tableData">
          <el-table-column label="编号" width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.dID }}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="电话" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.delTel }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="
                  dialogFormVisible2 = true;
                  deliverByid(scope.row.dID);
                "
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="open(scope.row.dID)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-button size="medium" type="primary" @click="dialogFormVisible = true"
        >添加</el-button
      >
    </div>
    <!-- 添加弹框 -->
    <el-dialog
      title="配送员信息"
      :visible.sync="dialogFormVisible"
      width="500px"
    >
      <el-form
        :label-position="labelPosition"
        :model="deliver"
        ref="deliver"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="deliver.name"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="delTel">
          <el-input v-model="deliver.delTel"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="deliverAdd()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹框 -->
    <el-dialog
      title="配送员信息"
      :visible.sync="dialogFormVisible2"
      width="500px"
    >
      <el-form :label-position="labelPosition" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="deliver2.name"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="deliver2.delTel"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            dialogFormVisible2 = false;
            deliverUpdate();
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import navbar from "@/components/back/subcomponents/navbar";
import topnavbar from "@/components/back/subcomponents/topnavbar";
export default {
  data() {
    return {
      id: this.$route.params.id,
      tableData: [], // 所有配送员信息
      deliver: {
        name: "",
        delTel: ""
      }, //添加配送员信息
      deliver2: {}, //编辑配送员信息
      dialogFormVisible: false,
      dialogFormVisible2: false,
      labelPosition: "right",
      rules: {
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        delTel: [{ required: true, message: "电话不能为空", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.getDeliverInfo();
  },
  methods: {
    //删除提示
    open(id) {
      this.$confirm(
        "请确认是否删除该配送员?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.deliverDelete(id);
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
    deliverAdd() {
      this.$refs.deliver.validate(valid => {
        if (valid) {
          this.$http
            .post("/api/deliver/add", { param: this.deliver })
            .then(resp => {
              if (resp.body == 1) {
                alert("添加成功");
                this.getDeliverInfo();
                this.deliver = {
                  name: "",
                  delTel: ""
                };
              }
            });
        }
      });
    },
    //获取配送员信息
    getDeliverInfo() {
      this.$http.post("/api/deliver").then(resp => {
        if (resp.status == 200) {
          this.tableData = resp.body;
        }
      });
    },
    deliverByid(id) {
      this.$http.post("/api/deliverByid", { dID: id }).then(resp => {
        if (resp.status == 200) {
          this.deliver2 = resp.body[0];
        }
      });
    },
    deliverUpdate() {
      this.$http
        .post("/api/deliver/update", { deliver2: this.deliver2 })
        .then(resp => {
          if (resp.body == 1) {
            alert("更新成功");
            this.getDeliverInfo();
          }
        });
    },
    deliverDelete(id) {
      this.$http.post("/api/deliver/delete", { dID: id }).then(resp => {
        if (resp.body == 1) {
          alert("删除成功");
          this.getDeliverInfo();
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
.resdispatcher {
  margin-top: 52px;
  display: flex;
  .content {
    width: 700px;
    height: 400px;
    margin-left: 10px;
    .dis-info {
      width: 700px;
    }
  }
}
</style>
