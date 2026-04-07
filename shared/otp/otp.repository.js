const OTP = require("./otp.model");

const create = async (data) => {
    const newOTP = new OTP(data);
    await newOTP.save();
    return newOTP;
};

const findByEmail = async (email) => {
    return await OTP.findOne({ email });
};

const deleteByEmail = async (email) => {
    return await OTP.deleteMany({ email });
};

const findByEmailAndOtp = async (email, otp) => {
    return await OTP.findOne({ email, otp, expiresAt: { $gt: new Date() } });
};

module.exports = { create, findByEmail, deleteByEmail, findByEmailAndOtp };