import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localfilepath) => {
    try {
        // If no file found on locally saved temp file
        if(!localfilepath) return null

        // FILE FOUND -> UPLOADING THE FILE ON CLOUDINARY
        const response = await cloudinary.uploader.upload(localfilepath, {
            resource_type: "auto"
        })
        
        // REMOVING THE LOCALLY SAVED FILE TEMP FILE
        fs.unlinkSync(localfilepath)
        return response;
    } catch (error) {

        fs.unlinkSync(localfilepath)
        return null;
    }
}

export { uploadOnCloudinary }