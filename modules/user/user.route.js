const express = require("express");
const controller = require("./user.controller");
const { uploadFields } = require("../../shared/middlewares/upload.middleware");
const { authGuard } = require("../../shared/middlewares/auth.middleware.js");
const validate = require("../../shared/middlewares/errorValidate.middleware.js");
const { registerSchema } = require("./user.validation.js");
const router = express.Router();

/**
 * @swagger
 * /api/v1/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *               phone:
 *                 type: string
 *               idNumber:
 *                 type: string
 *               lang:
 *                 type: string
 *                 enum: [ar, en]
 *               permission:
 *                 type: string
 *                 enum: [service, realEstate, marketplace, stores]
 *               idImageFront:
 *                 type: string
 *                 format: binary
 *               idImageBack:
 *                 type: string
 *                 format: binary
 *               idImageSelfie:
 *                 type: string
 *                 format: binary
 *               profileImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post(
  "/register",
  uploadFields,
  validate(registerSchema),
  controller.register,
);

/**
 * @swagger
 * /api/v1/user/verify-otp:
 *   post:
 *     summary: Verify OTP for email verification
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid OTP
 *       500:
 *         description: Server error
 */
router.post("/verify-otp", controller.verifyOTP);

/**
 * @swagger
 * /api/v1/user/update-location:
 *   post:
 *     summary: Update user location
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - governorateId
 *               - areaId
 *               - streetName
 *               - apartment
 *               - floorNumber
 *               - buildingNumber
 *             properties:
 *               userId:
 *                 type: string
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
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/update-location", authGuard, controller.updateLocation);

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: User login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 *       403:
 *         description: Email not verified
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post("/login", controller.login);

// Password management
/**
 * @swagger
 * /api/v1/user/change-password-request:
 *   post:
 *     summary: Request OTP for password change
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OTP sent to email
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post(
  "/change-password-request",
  authGuard,
  controller.requestChangePassword,
);

/**
 * @swagger
 * /api/v1/user/change-password:
 *   post:
 *     summary: Change password with OTP
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - otp
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               otp:
 *                 type: string
 *               newPassword:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/change-password", authGuard, controller.changePassword);

// Password reset for forgotten password
/**
 * @swagger
 * /api/v1/user/forgot-password:
 *   post:
 *     summary: Request password reset OTP
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: OTP sent to email
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post("/forgot-password", controller.forgotPassword);

/**
 * @swagger
 * /api/v1/user/reset-password:
 *   post:
 *     summary: Reset password with OTP
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               otp:
 *                 type: string
 *               newPassword:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post("/reset-password", controller.resetPassword);

// Protected routes
/**
 * @swagger
 * /api/v1/user/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/me", authGuard, controller.getMe);

/**
 * @swagger
 * /api/v1/user/me:
 *   put:
 *     summary: Update current user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               language:
 *                 type: string
 *                 enum: [ar, en]
 *               permission:
 *                 type: string
 *                 enum: [service, realEstate, marketplace, stores]
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.put("/me", authGuard, controller.updateMe);

/**
 * @swagger
 * /api/v1/user/me:
 *   delete:
 *     summary: Delete current user account
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.delete("/me", authGuard, controller.deleteMe);

/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/", authGuard, controller.getUsers);

/**
 * @swagger
 * /api/v1/user/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
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
 *         description: User data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get("/:id", authGuard, controller.getUserById);

/**
 * @swagger
 * /api/v1/user/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [User]
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
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               language:
 *                 type: string
 *                 enum: [ar, en]
 *               permission:
 *                 type: string
 *                 enum: [service, realEstate, marketplace, stores]
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put("/:id", authGuard, controller.updateUserById);

/**
 * @swagger
 * /api/v1/user/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [User]
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
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", authGuard, controller.deleteUserById);

module.exports = router;
