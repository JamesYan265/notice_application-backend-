const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const cors = require("cors");

let PORT = process.env.PORT;
if(PORT == null || PORT == "") {
    PORT = 5000;
}

//回避Cors錯誤
app.use(cors({
    origin: "http://localhost:3000",
}))

//使用Json
app.use(express.json());

//將api導入index.js 創做先頭路徑"api/v1"
//Example Register (API localhost:5000/api/v1/register )
app.use("/api/v1", require("./src/v1/routes"));

//mongoDB connect
try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("DB connecting...")
} catch(error) {
    console.log(error);
}



app.listen(PORT, ()=> {
    console.log("local server starting");
})