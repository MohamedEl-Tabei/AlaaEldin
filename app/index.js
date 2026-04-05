const express = require("express");
const cors = require("cors");
const userRouter=require("../modules/user/user.route")
const constants=require("../shared/constants")
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(`${constants.baseURL}/user`,userRouter)

module.exports = app;