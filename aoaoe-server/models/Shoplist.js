const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShoplistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    poi_back_pic_url: {
        type: String,
        required: true
    },
    head_pic_url: {
        type: String,
        required: true
    },
    pic_url: {
        type: String,
        required: true
    },
    wm_poi_score: {
        type: Number,
        required: true
    },
    month_sale_num: {
        type: String,
        required: true
    },
    distance: {
        type: String,
        required: true
    },
    mt_delivery_time: {
        type: String,
        required: true
    },
    min_price_tip: {
        type: String,
        required: true
    },
    shipping_fee_tip: {
        type: String,
        required: true
    },
    average_price_tip: {
        type: String,
        required: true
    },
    shipping_time_x: {
        type: String,
        required: true,
        default:"7:00-23:00"
    },
    address:{
        type:String,
        required:true
    },
    tel:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = Shoplist = mongoose.model("Shoplist", ShoplistSchema)