const router = require("express").Router();
const neighborhoodController = require("./neighborhood.controller");
const auth = require("../../shared/middlewares/auth.middleware");

/**
 * @swagger
 * /api/v1/neighborhood:
 *   get:
 *     summary: Get neighborhoods by governorate ID and language
 *     description: Retrieve a list of neighborhoods based on governorate ID and language.
 *     tags: [Neighborhood]
 *     parameters:
 *       - in: query
 *         name: governorateId
 *         schema:
 *           type: string
 *         description: The ID of the governorate.
 *       - in: query
 *         name: language
 *         schema:
 *           type: string
 *         description: The language of the neighborhoods.
 *     responses:
 *       200:
 *         description: A list of neighborhoods.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */


router.get("/", neighborhoodController.findByGovernorateIdAndLanguage);


/**
 * @swagger
 * /api/v1/neighborhood/{governorateID}:
 *   post:
 *     summary: Admins only - Create neighborhoods
 *     description: Create a new neighborhood with Arabic and English names. Returns the new neighborhood. email> admin@alaaEldin.com & password> 12345Aa$
 *     tags: [Neighborhood]
 *     parameters:
 *       - in: path
 *         name: governorateID
 *         schema:
 *           type: string
 *         description: The ID of the governorate.
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
 *         description: new neighborhood created.
 *       400:
 *         description: Bad request - validation errors
 *       401:
 *         description: Unauthorized
 *       403:
 *        description: Forbidden - Admins only
 * */
router.post(
  "/:governorateID",
  auth.authGuard,
  auth.adminGuard,
  neighborhoodController.create,
);
module.exports = router;
