const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiscoverSchema = new Schema({
    images:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports = Discover = mongoose.model("Discover", DiscoverSchema)
