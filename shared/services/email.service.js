const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail", // or your email service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendOTP = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your OTP Code",
        text: `Your 4-digit OTP code is: ${otp}. It expires in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendOTP };