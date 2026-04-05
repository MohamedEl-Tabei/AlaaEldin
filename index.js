require("dotenv").config()
const mongoose= require("mongoose");
const app=require("./app")


mongoose.connect(process.env.MONGODBURI).then(()=>console.log("Database connected"))
app.listen(process.env.PORT||5000,()=>{console.log(`App run`)})