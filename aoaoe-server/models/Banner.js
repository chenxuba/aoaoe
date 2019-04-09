const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BannerSchema = new Schema({
    banner:{
        type:String,
        required:true
    },
    banner_url:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }

})
module.exports = Banner = mongoose.model("Banner", BannerSchema)

