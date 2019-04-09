<template>
  <div class="fillContainer">
    <div>
      <el-form :inline="true">
        <el-form-item class="btnRight">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/foundlist' }">数据管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/foundlist' }">店铺列表</el-breadcrumb-item>
          </el-breadcrumb>
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="店铺名称">
                <span v-rainbow>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span v-rainbow>{{ props.row._id }}</span>
              </el-form-item>
              <el-form-item label="店铺封面">
                <img :src="props.row.pic_url" alt class="img" v-preview="props.row.pic_url">
              </el-form-item>
               <el-form-item label="店铺头部封面">
                <img :src="props.row.head_pic_url" alt class="img2" v-preview="props.row.head_pic_url">
              </el-form-item>
               <el-form-item label="活动页封面">
                <img :src="props.row.poi_back_pic_url" alt class="img" v-preview="props.row.poi_back_pic_url">
              </el-form-item>
              <el-form-item label="联系电话">
                <span v-rainbow>{{ props.row.tel }}</span>
              </el-form-item>
              <el-form-item label="店铺评分">
                <div class="star">
                  <app-star :score="props.row.wm_poi_score"></app-star>
                </div>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="添加时间"
          prop="date"
          :formatter="dateFormat"
          align="center"
          width="200"
        ></el-table-column>
        <el-table-column label="店铺 ID" prop="_id" align="center" width="200"></el-table-column>
        <el-table-column label="店铺名称" prop="name" align="center"></el-table-column>
        <el-table-column label="店铺地址" prop="address" align="center"></el-table-column>
        <el-table-column label="操作" prop="operation" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="warning"
              size="small"
              icon="edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="warning"
              size="small"
              icon="edit"
              @click="addFood(scope.$index, scope.row)"
            >添加食品</el-button>
            <el-button
              size="small"
              type="danger"
              icon="delete"
              @click="handleDelete(scope.$index, scope.row)"
              v-if="user.identity == '管理员'"
            >删除</el-button>
            <el-button size="small" type="danger" icon="delete" @click="stop" v-else>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <DialogFound :dialogFound="dialogFound" :formData="formData" @update="getProfile()"></DialogFound>
  </div>
</template>

<script>
import Star from "../components/star/Star";
import DialogFound from "../components/DialogFound";
export default {
  name: "foundList",
  data() {
    return {
      tableData: [],
      formData: {
        name: "",
        pic_url: "",
        address: "",
        tel: ""
      },
      dialogFound: {
        show: false,
        title: "",
        option: "edit"
      }
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    dateFormat(row, column, cellValue, index) {
      //格式化时间
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
    getProfile() {
      this.$axios
        .get("http://chenruisheng.info/aoaoe/api/shoplist/all/admin")
        .then(res => {
          //获取全部店铺列表
          console.log(res)
          this.tableData = res.data;
          // console.log(this.tableData)
        });
    },
    handleEdit(index, row) {
      //编辑
      this.dialogFound = {
        show: true,
        title: "修改信息",
        option: "edit"
      };
      this.formData = {
        id: row._id, //禁止删除，必须定义的。否则会报数据库查询错误
        name: row.name,
        pic_url: row.pic_url,
        address: row.address,
        tel: row.tel,
        head_pic_url:row.head_pic_url,
        poi_back_pic_url:row.poi_back_pic_url
      };
    },
    handleDelete(index, row) {
      console.log(row)
      this.$confirm("此操作将永久删除该店铺和其下所有数据,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .delete(
              `http://www.chenruisheng.info/aoaoe/api/shop/delete/${row._id}`
            )
            .then(res => {
              this.$message({
                message: "数据删除成功",
                type: "success"
              });
              this.getProfile();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addFood(index, row) {
      // this.$router.push("/addfoodlist/" + row._id);
      console.log(row)
       this.$router.push({ 
        path: "addfoodlist/" + row._id,
        query: {     
              shop_id: row._id ,
              name: row.name
            } 
        });
    },
    stop() {
      this.$message.error('只有管理员才有删除权限');
    }
  },
  components: {
    DialogFound,
    "app-star": Star
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>

<style scoped>
.demo-table-expand .el-form-item {
  margin-bottom: 30px !important;
}
.star {
  line-height: 48px;
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

.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: left;
  position: relative;
  top: 10px;
  left: 10px;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
.img {
  width: 60px;
  height: 60px;
  border-radius: 13px;
  object-fit: cover;
}
.img2 {
  width: 150px;
  height: 60px;
  /* border-radius: 13px; */
  object-fit: cover;
}
</style>
