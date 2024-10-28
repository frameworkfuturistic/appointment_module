// backend/services/imageUploader.js
const crypto = require('crypto');
const axios = require('axios');
const FormData = require('form-data');

const imageUploaderV2 = async (files) => {
    const toReturn = [];
    try {
        await Promise.all(
            files.map(async (item) => {
                const hashed = crypto.createHash('SHA256').update(item.buffer).digest('hex');

                const formData = new FormData();
                formData.append('file', item.buffer, item.mimetype);
                formData.append('tags', item.originalname.substring(0, 7));

                const headers = {
                    'x-digest': hashed,
                    token: process.env.DMS_TOKEN,
                    folderPathId: 1,
                    ...formData.getHeaders(),
                };

                // Upload the image
                const response = await axios.post(process.env.DMS_UPLOAD || '', formData, { headers });
                
                // Get the full path of the uploaded image
                const getPathHeaders = {
                    token: process.env.DMS_TOKEN,
                };
                const imagePathResponse = await axios.post(process.env.DMS_GET || '', {
                    referenceNo: response.data.data.ReferenceNo,
                }, { headers: getPathHeaders });

                toReturn.push(imagePathResponse.data.data.fullPath);
            })
        );
    } catch (err) {
        throw err; // Re-throw the error to be handled in the route
    }
    return toReturn;
};

module.exports = { imageUploaderV2 }; // Export the function
