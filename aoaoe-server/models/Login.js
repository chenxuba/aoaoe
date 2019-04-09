const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//后台管理系统的登录接口模型
const loginSchema = new Schema({
    loginame:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    identity:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = Login = mongoose.model("Login", loginSchema)