import axios from 'axios';

const CLOUDINARY_CLOUD_NAME = 'doflfv1yz';
const CLOUDINARY_UPLOAD_PRESET = 'products';
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export const uploadToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const response = await axios.post(CLOUDINARY_URL, formData);
    
    if (response.data && response.data.secure_url) {
      return response.data.secure_url;
    } else {
      throw new Error('Upload failed');
    }
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};