const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//前端登录的接口模型
const userSchema = new Schema({
  // 用户名
  loginame: { type: String },
  // 密码
  password: { type: String },
  // 类型
  phone: { type: String },
  //时间
  date: {
    type: Date,
    default: Date.now
  }
})
UserModel = mongoose.model('user', userSchema)

// 3. 向外暴露
module.exports = {
  getModel(name) {
    return mongoose.model(name)
  }
}