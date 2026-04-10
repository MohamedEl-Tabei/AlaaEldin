const router = require("express").Router();
const neighborhoodController = require("./neighborhood.controller");

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

module.exports = router;
