<template>
  <div class="foodlist">
    <el-form :inline="true">
      <el-form-item class="btnRight">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/foodlist' }">数据管理</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/foodlist' }">食品列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-form-item>
    </el-form>
    <el-table :data="FoodlistData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span v-rainbow>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span v-rainbow>{{ props.row.classes[0].shop[0].name }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span v-rainbow>{{ props.row._id }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span v-rainbow>{{ props.row.classes[0].shop[0]._id }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span v-rainbow>{{ props.row.classes[0].name }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span v-rainbow>{{ props.row.classes[0].shop[0].address }}</span>
            </el-form-item>
             <el-form-item label="商品图片">
              <img :src="props.row.picture" alt class="img" v-preview="props.row.picture">
            </el-form-item>
            <el-form-item label="商品描述" v-if="props.row.description">
              <span v-rainbow>{{ props.row.description }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="添加时间" prop="date" :formatter="dateFormat"></el-table-column>
      <el-table-column label="商品 ID" prop="_id"></el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="所属店铺" prop="classes[0].shop[0].name" width="250px"></el-table-column>
      <el-table-column label="赞👍" prop="praise_content"></el-table-column>
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
    <DialogFood :dialogFood="dialogFood" :formData="formData" @update="getFoodlist()"></DialogFood>
  </div>
</template>

<script>
import DialogFood from "../components/DialogFood";
export default {
  data() {
    return {
      FoodlistData: [],
      formData: {
        name: "",
        picture: "",
        description: "",
        praise_content:""
      },
      dialogFood: {
        show: false,
        title: "",
        option: "edit"
      }
    };
  },
  mounted() {
    this.getFoodlist(); //请求数据
  },
  methods: {
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
      //编辑
      this.dialogFood = {
        show: true,
        title: "修改信息",
        option: "edit"
      };
      this.formData = {
        id: row._id, //禁止删除，必须定义的。否则会报数据库查询错误
        name: row.name,
        picture:row.picture,
        description:row.description,
        praise_content:row.praise_content
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
            .delete(`http://chenruisheng.info/aoaoe/api/food/delete/${row._id}`)
            .then(res => {
              this.$message({
                message: "数据删除成功",
                type: "success"
              });
              this.getFoodlist();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getFoodlist() {
      this.$axios //获取食物列表
        .get("http://chenruisheng.info/aoaoe/api/food/allmsg")
        .then(result => {
          console.log(result);
          this.FoodlistData = result.data;
          // console.log(this.FoodlistData);
        })
        .catch(err => {
          console.log(err);
        });
    },
    stop() {
      this.$message.error("只有管理员才有删除权限");
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  components: {
    DialogFood
  },
};
</script>

<style scoped>
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
.btnRight {
  float: left;
  position: relative;
  top: 10px;
  left: 10px;
}
.img {
  width: 40px;
  height: 40px;
}
</style>
