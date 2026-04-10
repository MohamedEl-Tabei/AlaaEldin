const router = require("express").Router();
const governorateController = require("./governorate.controller");
const governorateValidation = require("./governorate.validation");
const validate = require("../../shared/middlewares/errorValidate.middleware");
const auth = require("../../shared/middlewares/auth.middleware");
/**
 * @swagger
 * /api/v1/governorate:
 *   post:
 *     summary: Admin only - Create a new governorate
 *     description: Create a new governorate with Arabic and English names. Returns the updated list of governorates. email> admin@alaaEldin.com & password> 12345Aa$
 *     tags: [Governorate]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              nameAr:
 *                type: string
 *                example: القاهرة
 *              nameEn:
 *               type: string
 *               example: Cairo
 *     responses:
 *       201:
 *         description: Governorate created successfully & returned list of governorates
 *       400:
 *         description: Bad request - validation errors
 *       401:
 *         description: Unauthorized
 *       403:
 *        description: Forbidden - Admins only
 *
 */

router.post(
  "/",
  validate(governorateValidation.create),
  auth.authGuard,
  auth.adminGuard,
  governorateController.create,
);
/**
 * @swagger
 * /api/v1/governorate/{language}:
 *   get:
 *     summary: Get all governorates in specified language (en or ar)
 *     description: Retrieve a list of all governorates in the specified language. Use 'en' for English and 'ar' for Arabic.
 *     tags: [Governorate]
 *     parameters:
 *     - in: path
 *       name: language
 *       description: The language in which to retrieve governorates ('en' or 'ar')
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: A list of governorates in the specified language.
 *       500:
 *         description: Internal server error.
 */
router.get("/:language", governorateController.findAllByLanguage);
module.exports = router;
