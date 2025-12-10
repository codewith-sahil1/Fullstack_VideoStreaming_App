import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
// function to upload the file
const fileuploader =async (filename) => {
    try {
        // when file is not exist 
        if (!filename) return null
        // file exist now code for upload
        const response = await cloudinary.uploader.upload(filename, {
            resource_type: "auto"
        })
        console.log("file is uplaoded on cloudinary", response.url);
        return response;

    } catch (error) {

        fs.unlinkSync(filename)// remove the locally save temparaory file as the uplaod operation gotfailed
        return null;
    }

}
export {fileuploader}