const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    class_id:{
        type:mongoose.Schema.Types.ObjectId
    },
    name:{
        type:String,
        required:true
    },
    min_price:{
        type:String,
        required:true
    },
    month_saled_content:{
        type:String,
        required:true
    },
    praise_content:{
        type:String,
        required:true
    },
    unit:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        required:true
    },
    product_label_picture:{
        type:String,
        // required:true
    },
    description:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
        // moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    },
    shop_id:{
        type:String,
        // required:true
    }


})
module.exports = Food = mongoose.model("Food", FoodSchema)

