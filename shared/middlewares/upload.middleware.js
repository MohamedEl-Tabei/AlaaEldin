const multer = require("multer");

// Configure multer for in-memory file storage
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB max
    },
});

// Middleware to handle form-data with both text and file fields
// Using .any() to accept all fields (text + files)
const uploadFields = upload.any();

module.exports = { upload, uploadFields };