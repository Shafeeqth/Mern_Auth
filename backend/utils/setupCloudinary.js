import 'dotenv/config'
import { v2 as cloudinary } from 'cloudinary';

export default cloudinary.config({
    cloud_name: 'mern-main',
    api_key: '126712633264619',
    api_secret: 'YOUR_API_SECRET',
    secure: true,
})

