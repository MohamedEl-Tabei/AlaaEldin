const express = require("express");
const controller = require("./location.controller");
const { authGuard } = require("../../shared/middlewares/auth.middleware");
const validate = require("../../shared/middlewares/errorValidate.middleware");
const {
  createLocationSchema,
  updateLocationSchema,
} = require("./location.validation");
const router = express.Router();

// #region Create location
/**
 * @swagger
 * /api/v1/location:
 *   post:
 *     summary: 👍 Create a new location
 *     tags: [Location]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - governorateId
 *               - areaId
 *               - streetName
 *               - apartment
 *               - floorNumber
 *               - buildingNumber
 *             properties:
 *               governorateId:
 *                 type: string
 *                 example: 676ed79d469499c28eaccd9a
 *               areaId:
 *                 type: string
 *                 example: 676ee7cc469499c28eaccdff
 *               streetName:
 *                 type: string
 *                 example: 123 Main St
 *               apartment:
 *                 type: string
 *                 example: Apt 4B
 *               floorNumber:
 *                 type: string
 *                 example: 2
 *               buildingNumber:
 *                 type: string
 *                 example: 10
 *               additionalDetails:
 *                 type: string
 *                 example: Near the park
 *     responses:
 *       201:
 *         description: Location created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
// #endregion
router.post(
  "/",
  authGuard,
  validate(createLocationSchema),
  controller.createLocation,
);

//#region Get all locations
/**
 * @swagger
 * /api/v1/location:
 *   get:
 *     summary: 👍 Get all locations
 *     tags: [Location]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of locations
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
// #endregion
router.get("/", authGuard, controller.getLocations);

//#region Get location by ID
/**
 * @swagger
 * /api/v1/location/{id}:
 *   get:
 *     summary: 👍 Get location by ID
 *     tags: [Location]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Location data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Location not found
 *       500:
 *         description: Server error
 */
//#endregion
router.get("/:id", authGuard, controller.getLocationById);

// #region Update location by ID
/**
 * @swagger
 * /api/v1/location/{id}:
 *   put:
 *     summary: 👍 Update location by ID
 *     tags: [Location]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               governorateId:
 *                 type: string
 *               areaId:
 *                 type: string
 *               streetName:
 *                 type: string
 *               apartment:
 *                 type: string
 *               floorNumber:
 *                 type: string
 *               buildingNumber:
 *                 type: string
 *               additionalDetails:
 *                 type: string
 *     responses:
 *       200:
 *         description: Location updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Location not found
 *       500:
 *         description: Server error
 */
// #endregion
router.put(
  "/:id",
  authGuard,
  validate(updateLocationSchema),
  controller.updateLocationById,
);

// #region Delete location by ID
/**
 * @swagger
 * /api/v1/location/{id}:
 *   delete:
 *     summary: 👍 Delete location by ID
 *     tags: [Location]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Location deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Location not found
 *       500:
 *         description: Server error
 */
// #endregion
router.delete("/:id", authGuard, controller.deleteLocationById);

module.exports = router;
