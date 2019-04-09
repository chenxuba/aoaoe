const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    img_url:{
        type:String,
        required:true
    },
    // img_link:{
    //     type:String,
    //     required:true
    // },
    date:{
        type:Date,
        default:Date.now
    }

})
module.exports = Menu = mongoose.model("Menu", MenuSchema)

