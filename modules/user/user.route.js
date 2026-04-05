const express=require("express")
const controller= require("./user.controller")
const router=express.Router()
router.route("/test").get(controller.test)



module.exports=router