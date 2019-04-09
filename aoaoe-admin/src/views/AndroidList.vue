<template>
  <div class="addshop">
    <div>
      <el-form :inline="true">
        <el-form-item class="btnRight">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/androidlist' }">添加数据</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/androidlist' }">添加店铺</el-breadcrumb-item>
          </el-breadcrumb>
        </el-form-item>
      </el-form>
    </div>
    <div class="addform">
      <el-form ref="form" :model="form" label-width="80px" class="addshops" :rules="form_rules">
        <el-form-item label="店铺名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="tel">
          <el-input v-model="form.tel"></el-input>
        </el-form-item>
        <!-- <el-form-item label="营业时间">
          <el-input v-model="form.shipping_time_x"></el-input>
        </el-form-item>-->
        <div class="float">
          <el-form-item label="配送费用" prop="shipping_fee_tip">
            <el-input-number
              v-model="form.shipping_fee_tip"
              @change="handleChange"
              :min="0"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="起送费用" prop="min_price_tip">
            <el-input-number
              v-model="form.min_price_tip"
              @change="handleChange"
              :min="0"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="人均消费" prop="average_price_tip">
            <el-input-number
              v-model="form.average_price_tip"
              @change="handleChange"
              :min="0"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="月售数量" prop="month_sale_num">
            <el-input-number
              v-model="form.month_sale_num"
              @change="handleChange"
              :min="0"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="商家距离" prop="distance">
            <el-input-number v-model="form.distance" @change="handleChange" :min="0" label="描述文字"></el-input-number>
          </el-form-item>
          <el-form-item label="配送耗时" prop="mt_delivery_time">
            <el-input-number
              v-model="form.mt_delivery_time"
              @change="handleChange"
              :min="0"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
        </div>
        <el-form-item label="商家评分" prop="wm_poi_score">
          <el-rate v-model="form.wm_poi_score"></el-rate>
        </el-form-item>
        <div class="float">
          <el-form-item label="店铺封面" prop="pic_url">
            <el-upload
              class="avatar-uploader"
              action="http://chenruisheng.info/api/up/upload"
              :show-file-list="false"
              :name="key"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="form.pic_url" :src="form.pic_url" class="avatar">
              <el-button type="primary" v-else>点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="头部封面" prop="head_pic_url">
            <el-upload
              class="avatar-uploader"
              action="http://chenruisheng.info/api/up/upload"
              :show-file-list="false"
              :name="key"
              :on-success="handleAvatarSuccess1"
              :before-upload="beforeAvatarUpload1"
            >
              <img v-if="form.head_pic_url" :src="form.head_pic_url" class="avatar">
              <el-button type="primary" v-else>点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="活动页图" prop="poi_back_pic_url">
            <el-upload
              class="avatar-uploader"
              action="http://chenruisheng.info/api/up/upload"
              :show-file-list="false"
              :name="key"
              :on-success="handleAvatarSuccess2"
              :before-upload="beforeAvatarUpload2"
            >
              <img v-if="form.poi_back_pic_url" :src="form.poi_back_pic_url" class="avatar">
              <el-button type="primary" v-else>点击上传</el-button>
            </el-upload>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <el-form
        ref="discountForm"
        :model="discountForm"
        label-width="80px"
        :rules="form_rules2"
        v-if="showDis"
      >
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
import isPhone from "../../public/js/validate.js" //用于验证手机号
export default {
  data() {
    return {
      options: [],
      showDis: false,
      imageUrl: "",
      imageUrl1: "",
      imageUrl2: "",
      imageUrl3: "",
      key: "file",
      form: {
        name: "",
        address: "",
        tel: "",
        month_sale_num: 1,
        distance: 1,
        mt_delivery_time: 1,
        min_price_tip: 1,
        shipping_fee_tip: 1,
        average_price_tip: 1,
        pic_url: "",
        poi_back_pic_url: "",
        head_pic_url: ""
        // shipping_time_x: ""
      },
      discountForm: {
        icon_url: "",
        info: "",
        shop_id: "",
        name: ""
      },
      form_rules: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        tel: [{ required: true, message: '手机号不能为空', trigger: 'blur' },
            { type: 'string', min: 11, message: '手机号不允许小于11位', trigger: 'blur' },
            { validator: isPhone, trigger: 'blur' },],
        address: [{ required: true, message: "不能为空", trigger: "blur" }],
        month_sale_num: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        distance: [{ required: true, message: "不能为空", trigger: "blur" }],
        mt_delivery_time: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        shipping_fee_tip: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        average_price_tip: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        pic_url: [{ required: true, message: "不能为空", trigger: "blur" }],
        poi_back_pic_url: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        head_pic_url: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        wm_poi_score: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        min_price_tip: [
          { required: true, message: "不能为空", trigger: "blur" }
        ]
      },
      form_rules2: {
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
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          console.log(this.form);
          if (this.form.wm_poi_score == "") {
            this.$message({
              message: "商家评分必须评分",
              type: "warning"
            });
            return;
          }
          this.$axios
            .post("http://chenruisheng.info/aoaoe/api/shoplist/add", this.form)
            .then(res => {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              (this.form.name = ""), //清空表单
                (this.form.address = ""), //清空表单
                (this.form.tel = ""), //清空表单
                (this.form.pic_url = ""), //清空表单
                (this.form.poi_back_pic_url = ""), //清空表单
                (this.form.head_pic_url = ""), //清空表单
                (this.showDis = true);
            });
        }
      });
    },
    getShoplist() {
      //请求分类接口
      this.$axios
        .get("http://chenruisheng.info/aoaoe/api/shoplist/all")
        .then(res => {
          console.log(res);
          this.options = res.data;
        })
        .catch(err => {});
    }, //请求商品列表
    handleChange(value) {
      console.log(value);
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.imageUrl = res.url;
      this.form.pic_url = this.imageUrl;
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
      this.form.head_pic_url = this.imageUrl1;
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
      this.form.poi_back_pic_url = this.imageUrl2;
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
    //3
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
              //       icon_url: "",
              // info: "",
              // shop_id: "",
              // name:""
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
  padding: 50px 500px 0 200px;
}
.line.el-col.el-col-2 {
  text-align: center;
}
.avatar {
  width: 80px;
}
.addshops {
  margin-bottom: 100px;
}

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
.btn {
  margin-bottom: 200px;
  text-align: center;
}
</style>
