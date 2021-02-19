<template>
  <div class="restaurantAccount">
    <!-- 导航栏 -->
    <topnavbar></topnavbar>
    <navbar :index="'4'"></navbar>
    <!-- 账号信息展示区域 -->
    <div class="account">
      <p>管理员账户</p>
      <hr />
      <el-table stripe max-height="500" :data="adminInfo">
        <el-table-column fixed label="管理员账号" width="120">
          <template slot-scope="scope">
            <el-input v-model="scope.row.accountID" disabled></el-input>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="140">
          <template slot-scope="scope">
            <el-input v-model="scope.row.rname"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="密码" width="120">
          <template slot-scope="scope">
            <el-input v-model="scope.row.rpassword"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="adminInfoUpdate(scope.row)"
              >修改</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="open2(scope.row.accountID)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" size="medium" @click="dialogFormVisible3 = true"
        >添 加</el-button
      >
    </div>
    <div class="dis-info">
      <p>会员信息</p>
      <hr />
      <el-table stripe max-height="500" :data="userInfo">
        <el-table-column fixed label="会员ID" width="120">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>{{ scope.row.userID }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.uname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="密码" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.upassword }}</span>
          </template>
        </el-table-column>
        <el-table-column label="电话" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.tel }}</span>
          </template>
        </el-table-column>
        <el-table-column label="住址" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="
                dialogFormVisible2 = true;
                getUserInfoByid(scope.row.userID);
              "
              >详情</el-button
            >
            <el-button size="mini" type="danger" @click="open(scope.row.userID)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-button size="medium" type="primary" @click="dialogFormVisible = true"
        >添加</el-button
      >
    </div>
    <!-- 添加用户弹框 -->
    <el-dialog title="会员信息" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        ref="user"
        :model="user"
        :rules="rules"
      >
        <el-form-item label="userID" prop="userID">
          <el-input v-model="user.userID"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="uname">
          <el-input v-model="user.uname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="upassword">
          <el-input v-model="user.upassword"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="user.tel"></el-input>
        </el-form-item>
        <el-form-item label="住址">
          <el-input v-model="user.address"></el-input>
        </el-form-item>
        <el-form-item label="余额">
          <el-input v-model="user.money"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="userAdd()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加管理员弹框 -->
    <el-dialog
      title="管理员信息"
      :visible.sync="dialogFormVisible3"
      width="500px"
    >
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        ref="user"
        :model="admin"
        :rules="rules2"
      >
        <el-form-item label="账户ID" prop="accountID">
          <el-input v-model="admin.accountID"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="rname">
          <el-input v-model="admin.rname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="rpassword">
          <el-input v-model="admin.rpassword"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="adminInfoAdd(admin)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹框 -->
    <el-dialog
      title="配送员信息"
      :visible.sync="dialogFormVisible2"
      width="500px"
    >
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="user2"
        :rules="rules"
        ref="user2"
      >
        <el-form-item label="会员ID" prop="userID">
          <el-input v-model="user2.userID" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="uname">
          <el-input v-model="user2.uname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="upassword">
          <el-input v-model="user2.upassword"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="user2.tel"></el-input>
        </el-form-item>
        <el-form-item label="住址">
          <el-input v-model="user2.address"></el-input>
        </el-form-item>
        <el-form-item label="余额">
          <el-input v-model="user2.money"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="updateUserInfo()">确 定</el-button>
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
      labelPosition: "left",
      adminInfo: [],
      userInfo: [],
      dialogFormVisible: false, //添加会员flag
      dialogFormVisible2: false, //编辑flag
      dialogFormVisible3: false, //添加管理员flag
      admin: {
        accountID: "",
        rname: "",
        rpassword: ""
      },
      user: {
        userID: "",
        uname: "",
        password: "",
        address: "",
        tel: "",
        money: ""
      },
      user2: {}, //ID 查询用户
      rules: {
        userID: [
          { required: true, message: "会员ID不能为空", trigger: "blur" }
        ],
        uname: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        upassword: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ]
      },
      rules2: {
        accountID: [
          { required: true, message: "账户ID不能为空", trigger: "blur" }
        ],
        rname: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        rpassword: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.getAdminInfo();
    this.getAllUserInfo();
  },
  methods: {
    open(id) {
      this.$confirm("请确认是否删除该会员账号?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.userDelete(id);
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
    open2(id) {
      this.$confirm("请确认是否删除该会员账号?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (this.adminInfo.length > 1) {
            this.adminInfoDelete(id);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          } else {
            this.$message({
              type: "error",
              message: "管理员账户必须有一位"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getAdminInfo() {
      this.$http.post("/api/adminInfo").then(resp => {
        if (resp.status == 200) {
          this.adminInfo = resp.body;
        }
      });
    },
    // 更新管理员账户
    adminInfoUpdate(param) {
      // console.log(param)
      this.$http.post("/api/adminInfo/update", param).then(resp => {
        if (resp.status == 200) {
          if (resp.body == 1) {
            alert("修改成功");
          } else {
            alert("修改失败");
          }
        } else {
          alert("修改失败");
        }
      });
    },
    // 删除管理员账户
    adminInfoDelete(id) {
      this.$http.post("/api/adminInfo/delete", { accountID: id }).then(resp => {
        if (resp.body == 1) {
          this.getAdminInfo();
        }
      });
    },
    // 添加管理员账户
    adminInfoAdd(param) {
      this.$http.post("/api/adminInfo/add", param).then(resp => {
        if (resp.body == 1) {
          alert("添加成功");
          this.getAdminInfo();
        } else {
          alert(`添加失败，${resp.body}`);
        }
      });
    },

    // 获取所有用户信息
    getAllUserInfo() {
      this.$http.post("/api/alluserinfo").then(resp => {
        if (resp.status == 200) {
          this.userInfo = resp.body;
        }
      });
    },
    // 根据ID获取用户信息
    getUserInfoByid(id) {
      this.$http.post("/api/userInfo", { userID: id }).then(resp => {
        if (resp.status == 200) {
          this.user2 = resp.body[0];
        }
      });
    },
    // 编辑用户信息
    updateUserInfo() {
      let userParam = this.user2;
      this.$refs.user2.validate(valid => {
        if (valid) {
          this.$http.post("/api/userInfo/update", userParam).then(resp => {
            if (resp.body == 1) {
              this.getAllUserInfo();
              alert("修改成功");
            }
          });
        }
      });
    },
    // 添加会员
    userAdd() {
      this.$refs.user.validate(valid => {
        if (valid) {
          this.$http
            .post("/api/register", { userParam: this.user })
            .then(resp => {
              if (resp.status == 200) {
                if (resp.body == 1) {
                  alert("添加成功");
                  (this.user = {
                    userID: "",
                    uname: "",
                    password: "",
                    address: "",
                    tel: "",
                    money: "",
                  }),
                    this.getAllUserInfo();
                } else {
                  alert(resp.body);
                }
              }
            });
        }
      });
    },
    // 删除会员
    userDelete(userid) {
      this.$http.post("/api/userinfo/delete", { userID: userid }).then(resp => {
        if (resp.body == 1) {
          this.getAllUserInfo();
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
.restaurantAccount {
  margin-top: 52px;
  display: flex;
  p {
    font-size: 18px;
  }
  .account {
    width: 530px;
    height: 300px;
    margin-left: 10px;
  }
  .dis-info {
    margin-left: 10px;
    width: 755px;
  }
}
</style>
