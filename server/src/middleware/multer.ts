import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    // Determine resource type based on mimetype
    const resourceType = file.mimetype.startsWith('video') ? 'video' : 'image';
    
    return {
      folder: 'office_events',
      resource_type: resourceType,
      allowed_formats: resourceType === 'video' 
        ? ['mp4', 'mov', 'avi'] 
        : ['jpg', 'png', 'jpeg', 'gif'],
      format: resourceType === 'video' ? undefined : 'jpg', // Auto-convert images to JPG
    };
  },
});

const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 
      'video/mp4', 'video/quicktime', 'video/avi'
    ];
    allowedTypes.includes(file.mimetype) 
      ? cb(null, true) 
      : cb(new Error('Invalid file type'));
  }
});

export const mediaUpload = multer({ 
  storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB for videos
}).array('media', 10); // Max 10 files

export default upload;