<template>
  <div class="dialogandroid">
    <el-dialog
      :title="DialogAndroid.title"
      :visible.sync="DialogAndroid.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >
      <div class="form">
        <el-form
          ref="form"
          :model="formData"
          :rules="form_rules"
          label-width="90px"
          style="margin:10px;width:auto;"
        >
          <el-form-item prop="title" label="应用名称">
            <el-input type="title" v-model="formData.title"></el-input>
          </el-form-item>

          <el-form-item prop="info" label="描述">
            <el-input type="info" v-model="formData.info"></el-input>
          </el-form-item>

          <el-form-item prop="person" label="人数">
            <el-input type="person" v-model="formData.person"></el-input>
          </el-form-item>

          <el-form-item label="封面" prop="pic_url" v-model="formData.pic_url">
            <el-upload
              class="avatar-uploader"
              action="http://chenruisheng.info/api/up/upload"
              :show-file-list="false"
              :headers="header"
              :name="key"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="formData.pic_url" :src="formData.pic_url" class="avatar">
              <el-button type="primary" v-else >点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item prop="shiwan_url" label="邀请链接">
            <el-input type="shiwan_url" v-model="formData.shiwan_url"></el-input>
          </el-form-item>
          <el-form-item class="text_right">
            <el-button @click="DialogAndroid.show = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit('form')">提 交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "DialogAndroid",
  props: {
    DialogAndroid: Object,
    formData: Object
  },
  data() {
    return {
      imageUrl: "",
      key: 'file',
      header:{Authorization: localStorage.eleToken},
      form_rules: {
        shiwan_url: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        info: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        title: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        person: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        pic_url: [{ required: true, message: "不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          console.log(this.formData);
          const url = this.DialogAndroid.option == 'add' ? 'add' :`edit/${this.formData.id}`;
          //option用来区分是点的编辑还是添加，以此来决定调用哪个接口
          this.$axios.post(`http://chenruisheng.info/api/android/hot/${url}`,this.formData).then((res) => {
            this.$message({
              message:"数据执行完毕",
              type:"success"
            })
            this.DialogAndroid.show = false
            this.$emit("update");
          }).catch((err) => {
            
          });
        }
      });
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
        this.imageUrl = res.url
        this.formData.pic_url = this.imageUrl
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG && !isPNG) {
          this.$message.error('上传图片只能是JPG或者PNG格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return (isJPG || isPNG) && isLt2M;
      }
  }
};
</script>

<style scoped>
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 13px;
  }
</style>
