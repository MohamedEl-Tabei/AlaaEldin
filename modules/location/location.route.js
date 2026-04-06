const express = require("express");
const controller = require("./location.controller");
const { authGuard } = require("../../shared/middlewares/auth.middleware");
const router = express.Router();

/**
 * @swagger
 * /api/v1/location:
 *   post:
 *     summary: Create a new location
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
 *       201:
 *         description: Location created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/", authGuard, controller.createLocation);

/**
 * @swagger
 * /api/v1/location:
 *   get:
 *     summary: Get all locations
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
router.get("/", authGuard, controller.getLocations);

/**
 * @swagger
 * /api/v1/location/{id}:
 *   get:
 *     summary: Get location by ID
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
router.get("/:id", authGuard, controller.getLocationById);

/**
 * @swagger
 * /api/v1/location/{id}:
 *   put:
 *     summary: Update location by ID
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
router.put("/:id", authGuard, controller.updateLocationById);

/**
 * @swagger
 * /api/v1/location/{id}:
 *   delete:
 *     summary: Delete location by ID
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
router.delete("/:id", authGuard, controller.deleteLocationById);

module.exports = router;