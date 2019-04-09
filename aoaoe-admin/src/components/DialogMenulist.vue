<template>
  <div class="dialogmenulist">
    <el-dialog
      :title="dialogMenulist.title"
      :visible.sync="dialogMenulist.show"
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
          <el-form-item prop="name" label="商品名称">
            <el-input type="title" v-model="formData.name"></el-input>
          </el-form-item>

          <el-form-item label="商品封面" prop="icon_url" v-model="formData.icon">
            <el-upload
              class="avatar-uploader"
              action="http://chenruisheng.info/api/up/upload"
              :show-file-list="false"
              :headers="header"
              :name="key"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="formData.icon" :src="formData.icon" class="avatar">
              <el-button type="primary" v-else >点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item class="text_right">
            <el-button @click="dialogMenulist.show = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit('form')">提 交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "dialogMenulist",
  props: {
    dialogMenulist: Object,
    formData: Object
  },
  data() {
    return {
      imageUrl: "",
      key: 'file',
      header:{Authorization: localStorage.eleToken},
      form_rules: {
        name: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        icon: [
          { required: true, message: "不能为空", trigger: "blur" }
        ]
        
      }
    };
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          console.log(this.formData);
          const url = this.dialogMenulist.option == 'add' ? 'add' :`edit/${this.formData.id}`;
          //option用来区分是点的编辑还是添加，以此来决定调用哪个接口
          this.$axios.post(`http://www.chenruisheng.info/aoaoe/api/v1.0/admin/class/${url}`,this.formData).then((res) => {
            this.$message({
              message:"数据执行完毕",
              type:"success"
            })
            this.dialogMenulist.show = false
            this.$emit("update");
          }).catch((err) => {
            
          });
        }
      });
    },
    handleAvatarSuccess(res, file) {
      // console.log(res)
        this.imageUrl = res.url
        this.formData.icon = this.imageUrl
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
    width: 30px;
    height: 30px;
    border-radius: 13px;
    object-fit: cover;
  }
</style>
