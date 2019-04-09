<template>
  <div class="fillContainer">
    <div>
      <el-form :inline="true">
        <el-form-item class="btnRight">
          <!-- <el-button type="primary" size="big" icon="view" @click="handleAdd()">添加</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="_id" label="ID" width="280" align="center"></el-table-column>
        <el-table-column prop="date" label="注册时间" align="center" width="250">
          <template slot-scope="scope">
            <span style="color:#00d053">{{scope.row.date | time }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="loginame" label="用户" align="center" width="300">
          <template slot-scope="scope">
            <span style="color:#00d053">{{scope.row.loginame || scope.row.phone}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" prop="operation" align="center" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button
              type="warning"
              size="small"
              icon="edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button> -->
            <el-button
              size="small"
              type="danger"
              icon="delete"
              v-if="user.identity == '管理员'"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
            <el-button
              size="small"
              type="danger"
              icon="delete"
              v-else
              @click="stop"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <DialogReading :DialogReading="DialogReading" :formData="formData" @update="getProfile()"></DialogReading> -->
  </div>
</template>

<script>
// import DialogReading from "../components/DialogReading";
export default {
  name: "readinglist",
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.getProfile();
  },
  methods: {
    stop() {
      this.$message.error('只有管理员才有删除权限');
    },
    getProfile() {
      this.$axios.get("http://chenruisheng.info/aoaoe/api/user").then(res => {
        console.log(res);
        this.tableData = res.data;
        // console.log(this.tableData)
      });
    },
    // handleEdit(index, row) {
    //   //编辑
    //   // this.DialogReading = {
    //   //   show: true,
    //   //   title: "修改信息",
    //   //   option: "edit"
    //   // };
    //   // this.formData = {
    //   //   id: row._id, //禁止删除，必须定义的。否则会报数据库查询错误
    //   //   loginame: row.loginame,
    //   // };
    // },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .delete(`http://chenruisheng.info/aoaoe/api/user/delete/${row._id}`)
            .then(res => {
              this.$message({
                message: "数据删除成功",
                type: "success"
              });
              this.getProfile();
              console.log("111")
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleAdd() {
      this.DialogReading = {
        show: true,
        title: "添加信息",
        option: "add"
      };
      this.formData = {
        title: "",
        info: "",
        person: "",
        pic_url: "",
        shiwan_url: "",
        code: ""
      };
    }
  },
  // components: {
  //   DialogReading
  // },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>

<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
  position: relative;
  top: 10px;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
.img {
  width: 60px;
  height: 60px;
  border-radius: 13px;
}
</style>
