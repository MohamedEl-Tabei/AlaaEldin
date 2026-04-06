// require("dotenv").config()
// const mongoose= require("mongoose");
// const app=require("./app")


// mongoose.connect(process.env.MONGODBURI).then(()=>console.log("Database connected"))
// app.listen(process.env.PORT||5000,()=>{console.log(`App run`)})

require("dotenv").config()
const mongoose = require("mongoose");
const app = require("./app")

mongoose.connect(process.env.MONGODBURI, {
    serverSelectionTimeoutMS: 5000,
    family: 4, // Force IPv4
})
    .then(() => console.log("Database connected"))
    .catch((err) => {
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    });

app.listen(process.env.PORT || 5000, () => {
    console.log(`App running on port ${process.env.PORT || 5000}`)
});