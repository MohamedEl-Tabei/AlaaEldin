const express = require("express");
const controller = require("./review.controller.js");
const { authGuard } = require("../../shared/middlewares/auth.middleware.js");
const validate = require("../../shared/middlewares/errorValidate.middleware.js");
const { addToUserSchema } = require("./review.validation.js");
const router = express.Router();

/**
 * @swagger
 * /api/v1/review/add-to-user:
 *   post:
 *     summary: 👍 Add Review To User
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
 *                 example: 64a7b2c9e1d3f2a5b6c7d8e
 *               stars:
 *                 type: number
 *                 example: 5
 *               feedback:
 *                 type: string
 *                 example: "Great job!"
 *               details:
 *                 type: string
 *                 example: "Provided good service and delivered on time"
 *
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
router
  .route("/add-to-user")
  .post(authGuard, validate(addToUserSchema), controller.addToUser);
module.exports = router;
