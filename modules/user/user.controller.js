const userRepo=require("./user.repository.js")
const test = async (req, res) => {
    await res.status(200).json({
        message:"test"
    })
};

module.exports = {test};
