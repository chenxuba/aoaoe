<template>
  <div class="dislist">
    <div>
      <el-form :inline="true">
        <el-form-item class="btnRight">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/dislist' }">添加数据</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/dislist' }">活动列表</el-breadcrumb-item>
          </el-breadcrumb>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="DislistData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="活动ID">
              <span v-rainbow>{{ props.row._id }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span v-rainbow>{{ props.row.shop[0].name }}</span>
            </el-form-item>
            <el-form-item label="活动详情">
              <span v-rainbow>{{ props.row.info }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span v-rainbow>{{ props.row.shop[0]._id }}</span>
            </el-form-item>
            <el-form-item label="活动图标">
              <img :src="props.row.icon_url" alt class="img">
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="添加时间" prop="date" :formatter="dateFormat"></el-table-column>
      <el-table-column label="活动 ID" prop="_id"></el-table-column>
      <el-table-column label="活动名称" prop="name"></el-table-column>
      <el-table-column label="所属店铺" prop="shop[0].name"></el-table-column>
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
    <DialogDislist :dialogDislist="dialogDislist" :formData="formData" @update="getDislist()"></DialogDislist>
  </div>
</template>

<script>
import DialogDislist from "../components/DialogDislist";
export default {
  data() {
    return {
      DislistData: [],
      shop_name:"",
      formData: {
        name: "",
        info: "",
        icon_url: ""
      },
      dialogDislist: {
        show: false,
        title: "",
        option: "edit"
      }
    };
  },
  mounted() {
    this.getDislist(); //请求数据
  },
  methods: {
    stop() {
      this.$message.error('只有管理员才有删除权限');
    },
    dateFormat(row, column, cellValue, index) {
      var t = new Date(row.date); //row 表示一行数据, updateTime 表示要格式化的字段名称
      return (
        t.getFullYear() +
        "-" +
        (t.getMonth() + 1) +
        "-" +
        t.getDate() +
        " " +
        t.getHours() +
        ":" +
        t.getMinutes()
      );
    },
    handleEdit(index, row) {
      this.dialogDislist = {
        show: true,
        title: "修改信息",
        option: "edit"
      };
      this.formData = {
        id: row._id, //禁止删除，必须定义的。否则会报数据库查询错误
        name: row.name,
        info:row.info,
        icon_url:row.icon_url
      };
    },
    
  handleDelete(index, row) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        this.$axios.delete(`http://chenruisheng.info/aoaoe/api/discount/delete/${row._id}`).then(res => {
          this.$message({
            message: "数据删除成功",
            type: "success"
          });
          this.getDislist();
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
  getDislist() {
      this.$axios
        .get("http://chenruisheng.info/aoaoe/api/discount/shop")
        .then(result => {
            // console.log(result)
          this.DislistData = result.data;
          // this.shop_name = result.data[0].shop[0].name
          // console.log(this.shop_name)
        })
        .catch(err => {
          // console.log(err);
        });
    }
  },
   computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  components: {
    DialogDislist
  },
};
</script>

<style scoped>
.btnRight {
  float: left;
  position: relative;
  top: 10px;
  left: 10px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.img {
  width: 30px;
  height: 30px;
}
.demo-table-expand .el-form-item {
  margin-bottom: 30px !important;
}
</style>
