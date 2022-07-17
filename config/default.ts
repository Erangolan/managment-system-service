import cloudinary from 'cloudinary';

require('dotenv').config();

const {
  PORT,
  DB_HOST,
  DB_USER,
  DB_PASS,
  VT_API_KEY,
  VT_API_URL,
  CLOAD_AKI_KEY,
  CLOUD_API_SECRET,
  CLOUD_NAME,
} = process.env;

cloudinary.v2.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOAD_AKI_KEY,
  api_secret: CLOUD_API_SECRET,
});

export default {
  PORT,
  DB_URI: `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}`,
  VT_API_KEY,
  VT_API_URL,
};
