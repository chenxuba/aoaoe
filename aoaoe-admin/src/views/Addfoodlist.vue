<template>
  <div class="addshop">
    <div>
      <el-form :inline="true">
        <el-form-item class="btnRight">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/foundlist' }">店铺列表</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: `/addfoodlist/${this.id}`}">添加商品</el-breadcrumb-item>
          </el-breadcrumb>
        </el-form-item>
      </el-form>
    </div>
    <div class="addform">
      <el-form ref="form" :model="form" label-width="80px" :rules="form_rules">
        <el-row style="margin-top: 20px;">
          <header class="form_header">选择食品种类</header>
          <el-col :span="24">
            <el-form label-width="110px" class="addclass">
              <el-row class="category_select">
                <el-form-item label="食品种类">
                  <el-select style="width:100%;" v-model="form.class_id" @visible-change="getClass">
                    <el-option
                      v-for="(item) in options"
                      :key="item._id"
                      :value="item._id"
                      :label="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-row>
              <el-row class="add_category_row" :class="showAddCategory? 'showEdit': ''">
                <div class="add_category">
                  <el-form-item label="食品种类" prop="name">
                    <el-input v-model="classForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="图标" prop="icon">
                    <el-upload
                      class="avatar-uploader"
                      action="http://chenruisheng.info/api/up/upload"
                      :show-file-list="false"
                      :name="key"
                      :on-success="handleAvatarSuccess2"
                      :before-upload="beforeAvatarUpload2"
                      v-model="classForm.icon"
                    >
                      <img v-if="classForm.icon" :src="classForm.icon" class="avatar2">
                      <el-button type="primary" v-else>点击上传</el-button>
                    </el-upload>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitClass" v-if="classForm.name">提交</el-button>
                    <el-button type="primary" v-else disabled>提交</el-button>
                  </el-form-item>
                </div>
              </el-row>
              <div class="add_category_button" @click="addCategoryFun">
                <i class="el-icon-caret-top edit_icon" v-if="showAddCategory"></i>
                <i class="el-icon-caret-bottom edit_icon" v-else slot="icon"></i>
                <span>添加食品种类</span>
              </div>
            </el-form>
          </el-col>
        </el-row>
        <!-- <span class="detail" v-model="form.shop_id">{{this.$route.query.shop_id}}</span> -->
        <!-- <el-form-item label="所属店铺" prop="shop_id">
          <el-input v-model="form.shop_id" :disabled="true"></el-input>
        </el-form-item> -->
        <el-form-item label="所属店铺" prop="shop_id" >
          <el-select style="width:100%;" v-model="form.shop_id" :disabled="true">
            <el-option
              v-for="(item) in options2"
              :key="item._id"
              :value="item._id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="description">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <div class="float">
          <el-form-item label="单价" prop="min_price">
            <el-input-number v-model="form.min_price" :min="0" label="描述文字"></el-input-number>
          </el-form-item>
          <el-form-item label="月售量" prop="month_saled_content">
            <el-input-number v-model="form.month_saled_content" :min="0" label="描述文字"></el-input-number>
          </el-form-item>
          <el-form-item label="赞👍" prop="praise_content">
            <el-input-number v-model="form.praise_content" :min="0" label="描述文字"></el-input-number>
          </el-form-item>
          <el-form-item label="单位" prop="unit">
            <el-input v-model="form.unit"></el-input>
          </el-form-item>
        </div>
        <div class="float">
          <el-form-item label="商品封面" prop="picture">
            <el-upload
              class="avatar-uploader"
              action="http://chenruisheng.info/api/up/upload"
              :show-file-list="false"
              :name="key"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="form.picture" :src="form.picture" class="avatar">
              <el-button type="primary" v-else>点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="标签">
            <el-upload
              class="avatar-uploader"
              action="http://chenruisheng.info/api/up/upload"
              :show-file-list="false"
              :name="key"
              :on-success="handleAvatarSuccess1"
              :before-upload="beforeAvatarUpload1"
            >
              <img
                v-if="form.product_label_picture"
                :src="form.product_label_picture"
                class="avatar"
              >
              <el-button type="primary" v-else>点击上传</el-button>
            </el-upload>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
          <el-button @click="quxiao">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showAddCategory: false,
      options: [],
      options2: [{
        name:this.$route.query.name,
        _id:this.$route.query.shop_id,
      }],
      value: "",
      imageUrl: "",
      imageUrl1: "",
      imageUrl2: "",
      id: this.$route.params.id,
      key: "file",
      form: {
        name: "",
        min_price: 5,
        month_saled_content: 36,
        praise_content: 10,
        unit: "个",
        picture: "",
        product_label_picture: "",
        description: "",
        class_id: "",
        shop_id: this.$route.query.shop_id
      },
      classForm: {
        name: "",
        icon: ""
      },
      form_rules: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        min_price: [{ required: true, message: "不能为空", trigger: "blur" }],
        month_saled_content: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        praise_content: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        unit: [{ required: true, message: "不能为空", trigger: "blur" }],
        picture: [{ required: true, message: "不能为空", trigger: "blur" }],
        description: [{ required: true, message: "不能为空", trigger: "blur" }],
        shop_id: [{ required: true, message: "不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          console.log(this.form);
          if (this.form.class_id == "") {
            this.$message({
              message: "必须选择食品种类",
              type: "warning"
            });
            return;
          }
          this.$axios
            .post(
              `http://www.chenruisheng.info/aoaoe/api/food/add/${
                this.form.class_id
              }`,
              this.form
            )
            .then(res => {
              console.log(res);
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.form.name = "";
              this.form.picture = "";
              this.form.description = "";
              // this.form.name = "";
            });
        }
      });
    },
    submitClass() {
      //提交分类
      this.$axios
        .post(
          `http://chenruisheng.info/aoaoe/api/v1.0/admin/class/add/${this.id}`,
          this.classForm
        )
        .then(res => {
          console.log(res);
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.classForm = { brand_right: 0 }; //清空表单
        })
        .catch(err => {});
    },
    quxiao() {
      this.$router.go(-1);
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.imageUrl = res.url;
      this.form.picture = this.imageUrl;
    },
    beforeAvatarUpload(file) {
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
    //1
    handleAvatarSuccess1(res, file) {
      console.log(res);
      this.imageUrl1 = res.url;
      this.form.product_label_picture = this.imageUrl1;
    },
    beforeAvatarUpload1(file) {
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
    //2
    handleAvatarSuccess2(res, file) {
      console.log(res);
      this.imageUrl2 = res.url;
      this.classForm.icon = this.imageUrl2;
    },
    beforeAvatarUpload2(file) {
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
    addCategoryFun() {
      this.showAddCategory = !this.showAddCategory;
    },
    getClass() {
      //请求分类接口
      this.$axios
        .get(`http://chenruisheng.info/aoaoe/api/class/${this.id}`)
        .then(res => {
          console.log(res);
          this.options = res.data;
        })
        .catch(err => {});
    }
  }
};
</script>

<style scoped>
.el-rate {
  line-height: 49px;
}
.float {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.btnRight {
  float: left;
  position: relative;
  top: 10px;
  left: 10px;
}
.addform {
  padding: 50px 400px 0 200px;
  /* position: fixed; */
  margin-bottom: 100px;
}

.line.el-col.el-col-2 {
  text-align: center;
}
.avatar {
  width: 80px;
}
.form_header {
  text-align: center;
  margin-bottom: 10px;
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
</style>
