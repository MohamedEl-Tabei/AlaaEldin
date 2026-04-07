const express = require("express");
const controller = require("./review.controller.js");
const { authGuard } = require("../../shared/middlewares/auth.middleware.js");
const validate = require("../../shared/middlewares/errorValidate.middleware.js");
// const {} = require("./user.validation.js");
const router = express.Router();

/**
 * @swagger
 * /api/v1/review/add-to-user:
 *   post:
 *     summary: Add Review To User
 *     tags: [Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               stars:
 *                 type: number
 *               feedback:
 *                 type: string
 *               details:
 *                 type: string
 *     responses:
 *       200:
 *         description: Add Review and Get Avg Rating
 *       404:
 *         description: User Not Found
 *       400:
 *         description: Invalid data
 *       500:
 *         description: Server error
 */
router.route("/add-to-user").post(controller.addToUser);
module.exports = router;
