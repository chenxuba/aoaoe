const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    shop_id:{
        type:mongoose.Schema.Types.ObjectId,
    },
    name:{
        type:String,
        required:true
    },
    icon:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }

})
module.exports = Class = mongoose.model("Class", ClassSchema)

