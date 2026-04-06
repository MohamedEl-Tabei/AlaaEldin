// const express=require("express")
// const controller= require("./user.controller")
// const router=express.Router()
// router.route("/test").get(controller.test)



// module.exports=router


const express = require("express");
const controller = require("./user.controller");
const { authGuard } = require("../../shared/middlewares/auth.middleware.js");
const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);

// Protected routes
router.get("/me", authGuard, controller.getMe);

module.exports = router;