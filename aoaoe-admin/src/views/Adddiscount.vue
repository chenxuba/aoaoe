<template>
  <div class="adddiscounts">
    <div>
      <el-form :inline="true">
        <el-form-item class="btnRight">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/adddiscount' }">添加数据</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/adddiscount' }">添加活动</el-breadcrumb-item>
          </el-breadcrumb>
        </el-form-item>
      </el-form>
    </div>
    <div class="adddiscount">
      <el-form ref="discountForm" :model="discountForm" label-width="80px" :rules="form_rules">
        <!--dddddwwwddewwefffwfewfefewfewfwfwdd -->
        <el-row style="margin-top: 20px;">
          <header class="form_header">给谁添加活动呢？先选择一个店铺吧</header>
          <el-col :span="24">
            <el-form label-width="110px" class="addclass">
              <el-row class="category_select">
                <el-form-item label="店铺列表">
                  <el-select
                    style="width:100%;"
                    v-model="discountForm.shop_id"
                    @visible-change="getShoplist"
                  >
                    <el-option
                      v-for="(item) in options"
                      :key="item._id"
                      :value="item._id"
                      :label="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
        <el-form-item label="图标" prop="icon_url">
          <el-upload
            class="avatar-uploader"
            action="http://chenruisheng.info/api/up/upload"
            :show-file-list="false"
            :name="key"
            :on-success="handleAvatarSuccess3"
            :before-upload="beforeAvatarUpload3"
            v-model="discountForm.icon_url"
          >
            <img
              v-if="this.discountForm.icon_url"
              :src="this.discountForm.icon_url"
              class="avatar2"
            >
            <el-button type="primary" v-else>点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="活动详情" prop="info">
          <el-input v-model="discountForm.info"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="discountForm.name"></el-input>
        </el-form-item>
        <div class="btn">
          <el-button type="primary" @click="SubmitDis('discountForm')">立即创建</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [],
      imageUrl3: "",
      key: "file",
      discountForm: {
        icon_url: "",
        info: "",
        shop_id: "",
        name: ""
      },
      form_rules: {
        info: [{ required: true, message: "不能为空", trigger: "blur" }],
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        icon_url: [{ required: true, message: "不能为空", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.getShoplist(); //请求商铺
  },
  methods: {
    getShoplist() {
      //请求分类接口
      this.$axios
        .get("http://www.chenruisheng.info/aoaoe/api/shoplist/all")
        .then(res => {
          console.log(res);
          this.options = res.data;
        })
        .catch(err => {});
    },
    handleAvatarSuccess3(res, file) {
      this.imageUrl3 = res.url;
      this.discountForm.icon_url = this.imageUrl3;
    },
    beforeAvatarUpload3(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error("上传图片只能是JPG或者PNG格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return (isJPG || isPNG) && isLt2M;
    },
    SubmitDis(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if (this.discountForm.shop_id == "") {
            this.$message({
                message: "必须选择一个店铺",
                type: "warning"
              });
            return;
          }
          this.$axios
            .post(
              `http://chenruisheng.info/aoaoe/api/discount/add/${
                this.discountForm.shop_id
              }`,
              this.discountForm
            )
            .then(result => {
              console.log(result);
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.discountForm.icon_url = ""; //清空表单
              this.discountForm.info = ""; //清空表单
              this.discountForm.name = ""; //清空表单
            });
        }
      });
    } //提交活动
  }
};
</script>

<style scoped>
.form_header {
  text-align: center;
  margin-bottom: 40px;
}
.category_select {
  border: 1px solid #eaeefb;
  padding: 10px 30px 10px 10px;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
}
.add_category_row {
  height: 0;
  overflow: hidden;
  transition: all 400ms;
  background: #f9fafc;
}
.add_category {
  background: #f9fafc;
  padding: 10px 30px 0px 10px;
  border: 1px solid #eaeefb;
  border-top: none;
}
.add_category_row {
  height: 0;
  overflow: hidden;
  transition: all 400ms;
  background: #f9fafc;
}
.add_category_button {
  text-align: center;
  line-height: 40px;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  border: 1px solid #eaeefb;
  border-top: none;
  transition: all 400ms;
  cursor: pointer;
}
.add_category_button:hover {
  background: #f9fafc;
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
    0 2px 4px 0 rgba(232, 237, 250, 0.5);
  border-radius: 6px;
  transition: all 400ms;
  color: #47a1f8;
}
.addclass {
  margin-bottom: 50px;
}
.showEdit {
  height: 185px;
}
.avatar2 {
  width: 30px;
  height: 30px;
}
.adddiscount {
  padding: 100px 400px 0 200px;
}
.btn {
  text-align: center;
}
.btnRight {
  float: left;
  position: relative;
  top: 10px;
  left: 10px;
}
</style>
