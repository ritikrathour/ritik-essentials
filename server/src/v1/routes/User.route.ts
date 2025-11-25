import { Router } from "express";
import {
  UploadeUserAvatar,
  User,
  UserDetails,
} from "../controllers/User.controller";
import upload from "../middlewares/Multer.middleware";
import Authenticate from "../middlewares/Authtenticate.middleware";
import { authLimiter } from "../../libs/ExpressLimitter";
const userRoute = Router();

userRoute.route("/user").get(Authenticate, User);
userRoute.route("/update-user-details").put(Authenticate, UserDetails);
userRoute
  .route("/upload-avatar")
  .put(Authenticate, upload.single("image"), UploadeUserAvatar);
export default userRoute;
