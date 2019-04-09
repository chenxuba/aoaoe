const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DianzipingSchema = new Schema({
    url:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    }

})
module.exports = Dianziping = mongoose.model("Dianziping", DianzipingSchema)

