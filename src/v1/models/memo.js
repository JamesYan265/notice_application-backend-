const mongoose = require("mongoose");
const Schema = mongoose.Schema

const memoSchema = new Schema({
    //將相關的Schema連接, 類似SQL Table 的Primary Key, Forigen key
    user: {
        type: Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    icon: {
        type: String,
        default:"📒",
    },
    title: {
        type: String,
        default: "無標題",
    },
    description: {
        type: String,
        default: "輸入你想書寫的內容"
    },
    position: {
        type: Number, 
    },
    favourite: {
        type: Boolean, 
        default: false,
    },
    favouritePosition: {
        type: Number,
        default: 0,
    }
});

module.exports = mongoose.model("Memo", memoSchema);