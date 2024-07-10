import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";
//what we are gonna do is stpre the uploaded file temporarily in our server and
//then upload it to cloudinary and then delete it   (unlinking it)          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
}) 
const uploadoncloudinary=async(localfilepath)=>{
try {
    if(!localfilepath){
        return null
        
    }
    const response=await cloudinary.uploader.upload(localfilepath,{
        resource_type:"auto"
    })
    console.log("File is uploaded successfully on cloudinary")
    fs.unlinkSync(localfilepath)
    return response;
} catch (error) {
    fs.unlinkSync(localfilepath)
    return null;
}
}

// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });

  export{uploadoncloudinary}