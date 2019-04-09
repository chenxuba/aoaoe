const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiscountSchema = new Schema({
    icon_url:{
        type:String,
        required:true
    },
    info:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    shop_id:{
        type:mongoose.Schema.Types.ObjectId,
    },
    date:{
        type:Date,
        default:Date.now
    }

})
module.exports = Discount = mongoose.model("Discount", DiscountSchema)

