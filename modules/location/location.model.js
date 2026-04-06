const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    governorateId: {
        type: String,
        required: true,
        trim: true,
    },
    areaId: {
        type: String,
        required: true,
        trim: true,
    },
    streetName: {
        type: String,
        required: true,
        trim: true,
    },
    apartment: {
        type: String,
        required: true,
        trim: true,
    },
    floorNumber: {
        type: String,
        required: true,
        trim: true,
    },
    buildingNumber: {
        type: String,
        required: true,
        trim: true,
    },
    additionalDetails: {
        type: String,
        trim: true,
    },
});

const Location = mongoose.model("Location", locationSchema);
module.exports = Location;