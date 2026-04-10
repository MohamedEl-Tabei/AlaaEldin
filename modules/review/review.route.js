const express = require("express");
const controller = require("./review.controller.js");
const { authGuard } = require("../../shared/middlewares/auth.middleware.js");
const validate = require("../../shared/middlewares/errorValidate.middleware.js");
const { addToUserSchema } = require("./review.validation.js");
const router = express.Router();

/**
 * @swagger
 * /api/v1/review/{revieweeId}:
 *   post:
 *     summary: 👍 Add Review To User
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: revieweeId
 *         schema:
 *           type: string
 *         description: The ID of the user being reviewed
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
router.post(
  "/:revieweeId",
  authGuard,
  validate(addToUserSchema),
  controller.addToUser,
);
module.exports = router;
