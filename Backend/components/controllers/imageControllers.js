const fs = require('fs');
const cloudinary = require('../utils/cloudinary');

const uploadImages = async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    try {
        const uploadPromises = req.files.map((file) => {
            return cloudinary.uploader.upload(file.path, {
                transformation: [
                    { width: 500, height: 500, crop: "fill" }, // crop to 1:1 aspect ratio
                    { quality: "auto:good", fetch_format: "auto" } // auto-optimize with good quality and format
                ],
            })
            .then((result) => {
                // Remove the local file after upload
                fs.unlinkSync(file.path);
                return result;
            });
        });

        // Wait for all the uploads to complete
        const uploadResults = await Promise.all(uploadPromises);

        return res.status(200).json({ 
            success: true, 
            message: "Images uploaded successfully!",
            data: uploadResults
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error uploading images"
        });
    }
};


const uploadCarousel = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    try {
        // Upload the single file to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            transformation: [
                //{ width: 500, height: 500, crop: "fill" }, // crop to 1:1 aspect ratio
                { quality: "auto:good", fetch_format: "auto" } // auto-optimize with good quality and format
            ],
        });

        // Remove the local file after upload
        fs.unlinkSync(req.file.path);

        return res.status(200).json({ 
            success: true, 
            message: "Image uploaded successfully!",
            data: result
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error uploading image"
        });
    }
};


module.exports = {uploadImages, uploadCarousel};
