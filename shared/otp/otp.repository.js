const OTP = require("./otp.model");

const create = async (data) => {
    const payload = {
        ...data,
        email: String(data.email).toLowerCase(),
        otp: String(data.otp),
    };
    const newOTP = new OTP(payload);
    await newOTP.save();
    return newOTP;
};

const findByEmail = async (email) => {
    return await OTP.findOne({ email: String(email).toLowerCase() });
};

const deleteByEmail = async (email) => {
    return await OTP.deleteMany({ email: String(email).toLowerCase() });
};

const findByEmailAndOtp = async (email, otp) => {
    return await OTP.findOne({
        email: String(email).toLowerCase(),
        otp: String(otp),
        expiresAt: { $gt: new Date() },
    });
};

module.exports = { create, findByEmail, deleteByEmail, findByEmailAndOtp };