import { v2 } from "cloudinary";
import { config } from "../config/index";
import { logger } from "../config/Logger";
const UploadOnCloudinary = async (localFilePath: string) => {
  try {
    v2.config({
      cloud_name: config.cloudinaryCloudName,
      api_key: config.cloudinaryApiKey,
      api_secret: config.cloudinaryApiSecret,
    });
    if (!localFilePath) return null;
    const uploadAvatar = await new Promise((resolve, reject) => {
      const uploadStream = v2.uploader.upload_stream(
        { folder: "avatars" },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      );
      uploadStream.end(localFilePath);
    });
    return uploadAvatar;
  } catch (error) {
    logger.error(error);
    return null;
  }
};
export default UploadOnCloudinary;
