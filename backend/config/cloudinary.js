// import { v2 as cloudinary } from 'cloudinary';

// const connectCloudinary = async () => {

//     cloudinary.config({
//         cloud_name: process.env.CLOUDINARY_NAME,
//         api_key: process.env.CLOUDINARY_API_KEY,
//         api_secret: process.env.CLOUDINARY_SECRET_KEY
//     });

// }
import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = async () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY
        });
        
        // Test the connection
        const result = await cloudinary.api.ping();
        console.log('Cloudinary connection successful:', result);
    } catch (error) {
        console.error('Cloudinary connection error:', error);
        throw error;
    }
};
export default connectCloudinary;