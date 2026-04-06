const axios = require("axios");

const uploadImage = async (buffer, fileName) => {
    try {
        const fs = require("fs");
        const FormData = require("form-data");

        const form = new FormData();
        form.append('file', buffer, fileName);
        form.append('fileName', fileName);
        form.append('folder', '/alaaeldin-app');

        const auth = Buffer.from(
            `${process.env.IMAGEKIT_PRIVATE_KEY}:`
        ).toString('base64');

        const response = await axios.post(
            'https://upload.imagekit.io/api/v1/files/upload',
            form,
            {
                headers: {
                    ...form.getHeaders(),
                    'Authorization': `Basic ${auth}`
                }
            }
        );

        console.log("Image uploaded to ImageKit:", response.data.url);
        return response.data.url;
    } catch (error) {
        console.error("ImageKit upload error:", error.response?.data || error.message);

        // Fallback to placeholder if ImageKit fails
        console.log("Falling back to placeholder URL");
        return `https://via.placeholder.com/400x300?text=${encodeURIComponent(fileName)}`;
    }
};

module.exports = { uploadImage };