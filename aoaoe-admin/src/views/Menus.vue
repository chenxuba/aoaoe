<template>
  <div class="fillContainer">
    <div>
      <el-form :inline="true">
        <el-form-item class="btnRight">
          <el-button type="primary" size="big" icon="view" @click="handleAdd()">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="_id" label="ID" width="220" align="center"></el-table-column>
        <el-table-column prop="date" label="添加时间" align="center" width="200">
          <template slot-scope="scope">
            <span style="color:#00d053">{{scope.row.date | time }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="title" label="分类" align="center" width="180">
          <template slot-scope="scope">
            <span style="color:#ef352c">{{scope.row.title || scope.row.phone}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="loginame" label="图片" align="center" width="120">
          <template slot-scope="scope">
            <img :src="scope.row.img_url" alt class="img" v-preview="scope.row.picture">
          </template>
        </el-table-column>

        <el-table-column label="操作" prop="operation" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="warning"
              size="small"
              icon="edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="small"
              type="danger"
              icon="delete"
              v-if="user.identity == '管理员'"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
            <el-button size="small" type="danger" icon="delete" v-else @click="stop">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <DialogMenu :DialogMenu="DialogMenu" :formData="formData" @update="getProfile()"></DialogMenu>
  </div>
</template>

<script>
import DialogMenu from "../components/DialogMenu";
export default {
  name: "dialogmenu",
  data() {
    return {
      tableData: [],
      formData: {
        title: "",
        img_url: ""
      },
      DialogMenu: {
        show: false,
        title: "",
        option: "edit"
      }
    };
  },
  mounted() {
    this.getProfile();
  },
  methods: {
    stop() {
      this.$message.error("只有管理员才有删除权限");
    },
    getProfile() {
      this.$axios.get("http://www.chenruisheng.info/aoaoe/api/menu").then(res => {
        console.log(res);
        this.tableData = res.data;
        // console.log(this.tableData)
      });
    },
    handleEdit(index, row) {
      //编辑
      this.DialogMenu = {
        show: true,
        title: "修改信息",
        option: "edit"
      };
      this.formData = {
        id: row._id, //禁止删除，必须定义的。否则会报数据库查询错误
        title: row.title,
        img_url: row.img_url,
      };
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .delete(`http://www.chenruisheng.info/aoaoe/api/v1.0/admin/menu/delect/${row._id}`)
            .then(res => {
              this.$message({
                message: "数据删除成功",
                type: "success"
              });
              this.getProfile();
              console.log("111");
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
      this.DialogMenu = {
        show: true,
        title: "添加信息",
        option: "add"
      };
      this.formData = {
        title: "",
        img_url:""
      };
    }
  },
  components: {
    DialogMenu
  },
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
  width: 40px;
  height: 40px;
  border-radius: 13px;
  object-fit: cover;
}
</style>
