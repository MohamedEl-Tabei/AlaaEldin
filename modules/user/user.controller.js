// const userRepo=require("./user.repository.js")
// const test = async (req, res) => {
//     await res.status(200).json({
//         message:"test"
//     })
// };

// module.exports = {test};

const userRepo = require("./user.repository");
const locationRepo = require("../location/location.repository");
const otpRepo = require("../../shared/otp.repository");
const { uploadImage } = require("../../shared/services/imagekit.service");
const { sendOTP } = require("../../shared/services/email.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const errorFactory = require("../../shared/error/errorFactory");
const crypto = require("crypto");

const register = async (req, res) => {
  try {
    let {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phone,
      idNumber,
      lang,
      permission,
    } = req.body;

    firstName = firstName?.trim();
    lastName = lastName?.trim();
    email = email?.trim();
    password = password?.trim();
    confirmPassword = confirmPassword?.trim();
    phone = phone?.trim();
    idNumber = idNumber?.trim();
    lang = lang?.trim();
    permission = permission?.trim();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !phone ||
      !idNumber
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await userRepo.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    let idImageFrontUrl, idImageBackUrl, idImageSelfieUrl, profileImageUrl;

    try {
      if (req.files) {
        console.log(
          "   Field names:",
          Array.isArray(req.files)
            ? req.files.map((f) => f.fieldname).join(", ")
            : Object.keys(req.files).join(", "),
        );
      }

      // Build file map from req.files
      const filesMap = {};
      if (req.files) {
        if (Array.isArray(req.files)) {
          // If multer returns array format
          req.files.forEach((file) => {
            filesMap[file.fieldname] = file;
          });
        } else {
          // If multer returns object format
          Object.keys(req.files).forEach((key) => {
            const fileArray = req.files[key];
            if (Array.isArray(fileArray)) {
              filesMap[key] = fileArray[0];
            } else {
              filesMap[key] = fileArray;
            }
          });
        }
      }

      if (filesMap.idImageFront) {
        idImageFrontUrl = await uploadImage(
          filesMap.idImageFront.buffer,
          `id_front_${email}_${Date.now()}`,
        );
      } else {
        idImageFrontUrl = `https://via.placeholder.com/400x300?text=ID+Front`;
        console.log("No idImageFront provided, using placeholder");
      }

      if (filesMap.idImageBack) {
        idImageBackUrl = await uploadImage(
          filesMap.idImageBack.buffer,
          `id_back_${email}_${Date.now()}`,
        );
      } else {
        idImageBackUrl = `https://via.placeholder.com/400x300?text=ID+Back`;
        console.log("No idImageBack provided, using placeholder");
      }

      if (filesMap.idImageSelfie) {
        idImageSelfieUrl = await uploadImage(
          filesMap.idImageSelfie.buffer,
          `id_selfie_${email}_${Date.now()}`,
        );
      } else {
        idImageSelfieUrl = `https://via.placeholder.com/400x300?text=ID+Selfie`;
        console.log("No idImageSelfie provided, using placeholder");
      }

      if (filesMap.profileImage) {
        profileImageUrl = await uploadImage(
          filesMap.profileImage.buffer,
          `profile_${email}_${Date.now()}`,
        );
      } else {
        profileImageUrl = `https://via.placeholder.com/400x300?text=Profile+Image`;
      }

      console.log("All images processed successfully");
    } catch (error) {
      console.error("Image upload error:", error.message);
      return res
        .status(500)
        .json({ message: "Image upload failed", error: error.message });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepo.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      idNumber,
      language: lang || "ar",
      permission: permission || "service",
      profileImage: profileImageUrl,
      idImageFront: idImageFrontUrl,
      idImageBack: idImageBackUrl,
      idImageSelfie: idImageSelfieUrl,
      isVerified: false,
    });

    // Generate and send OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    await otpRepo.create({ email, otp });
    await sendOTP(email, otp);

    res.status(201).json({
      message:
        "User registered successfully. Please verify your email with OTP.",
      userId: user._id,
      email: user.email,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const otpRecord = await otpRepo.findByEmailAndOtp(email, otp);
  if (!otpRecord) {
    // return res.status(400).json({ message: "Invalid or expired OTP" });
    errorFactory.badRequest("Invalid or expired OTP", "otp");
  }

  // Mark user as verified
  const user = await userRepo.findByEmail(email);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await userRepo.updateById(user._id, { isVerified: true });
  await otpRepo.deleteByEmail(email);

  res
    .status(200)
    .json({ message: "Email verified successfully. Please add your address." });
};

const updateLocation = async (req, res) => {
  const {
    userId,
    governorateId,
    areaId,
    streetName,
    apartment,
    floorNumber,
    buildingNumber,
    additionalDetails,
  } = req.body;

  if (
    !userId ||
    !governorateId ||
    !areaId ||
    !streetName ||
    !apartment ||
    !floorNumber ||
    !buildingNumber
  ) {
    return res
      .status(400)
      .json({ message: "Missing required location fields" });
  }

  const location = await locationRepo.create({
    governorateId,
    areaId,
    streetName,
    apartment,
    floorNumber,
    buildingNumber,
    additionalDetails,
  });

  await userRepo.updateById(userId, { location: location._id });

  res.status(200).json({ message: "Location updated successfully" });
};

const getUsers = async (req, res) => {
  try {
    const users = await userRepo.findAll();
    res.status(200).json({ users });
  } catch (error) {
    console.error("Fetch users error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userRepo.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const user = await userRepo.updateById(id, updateData);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userRepo.deleteById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.location) {
      await locationRepo.deleteById(user.location);
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateMe = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const user = await userRepo.updateById(req.user._id, updateData);
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Update me error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteMe = async (req, res) => {
  try {
    const user = await userRepo.deleteById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.location) {
      await locationRepo.deleteById(user.location);
    }

    res.status(200).json({ message: "Your account has been deleted" });
  } catch (error) {
    console.error("Delete me error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const requestChangePassword = async (req, res) => {
  try {
    const otp = crypto.randomInt(100000, 999999).toString();
    await otpRepo.create({ email: req.user.email, otp });
    await sendOTP(req.user.email, otp);
    res
      .status(200)
      .json({ message: "OTP sent to your email for password change" });
  } catch (error) {
    console.error("Request change password error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { otp, newPassword, confirmPassword } = req.body;

    if (!otp || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const otpRecord = await otpRepo.findByEmailAndOtp(req.user.email, otp);
    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userRepo.updateById(req.user._id, { password: hashedPassword });
    await otpRepo.deleteByEmail(req.user.email);

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await userRepo.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    await otpRepo.create({ email, otp });
    await sendOTP(email, otp);

    res
      .status(200)
      .json({ message: "OTP sent to your email for password reset" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword, confirmPassword } = req.body;

    if (!email || !otp || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const otpRecord = await otpRepo.findByEmailAndOtp(email, otp);
    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userRepo.updateById(
      otpRecord.userId || (await userRepo.findByEmail(email))._id,
      { password: hashedPassword },
    );
    await otpRepo.deleteByEmail(email);

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userRepo.findByEmail(email);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!user.isVerified) {
    return res.status(403).json({ message: "Please verify your email first" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.status(200).json({ message: "Login successful", token });
};
const getMe = async (req, res) => {
  res.status(200).json({ user: req.user });
};
module.exports = {
  register,
  verifyOTP,
  updateLocation,
  login,
  getMe,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  updateMe,
  deleteMe,
  requestChangePassword,
  changePassword,
  forgotPassword,
  resetPassword,
};
