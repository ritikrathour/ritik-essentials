import { Request, Response } from "express";
import ApiError from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import AsyncHandler from "../../utils/AsyncHandler";
import UserModel from "../models/User.model";
import UploadOnCloudinary from "../../utils/UploadOnCloudinary";
// logged in user
const User = AsyncHandler(async (req: Request, res: Response) => {
  const user = req.user; // user is set by Authenticate middleware
  if (!user) {
    throw new ApiError(404, "User not found", false);
  }
  res.json(new ApiResponse(200, user, "User fetched successfully."));
});
// update user details
const UserDetails = AsyncHandler(async (req: Request, res: Response) => {
  // get details
  const { name, phone, address } = req.body;
  if (phone && phone?.length !== 10) {
    throw new ApiError(400, "Mobile Number Must Be 10 Digit!", false);
  }
  // update details
  const updateUser = await UserModel.findByIdAndUpdate(
    req.user && req.user._id,
    {
      name,
      phone,
      address,
    },
    {
      new: true,
    }
  );
  if (!updateUser) {
    throw new ApiError(500, "User details update failed", false);
  }
  res.json(
    new ApiResponse(200, updateUser, "User details update successfully")
  );
});
// update avtar image
const UploadeUserAvatar = AsyncHandler(async (req: Request, res: Response) => {
  const { avatar } = req.body;
  if (!avatar) {
    throw new ApiError(401, "please Provide valid avtar Image", false);
  }
  // upload on cloudinary
  const uploadedImagePath = await UploadOnCloudinary(avatar);
  if (!uploadedImagePath) {
    throw new ApiError(500, "Failed To upload Avatar");
  }
  // find user and update
  const user = await UserModel.findByIdAndUpdate(
    req.user && req.user._id,
    {
      avatar: uploadedImagePath,
    },
    {
      new: true,
    }
  );
  if (!user) {
    throw new ApiError(500, "Failed to update Avatar");
  }
  res.json(new ApiResponse(200, user.avatar, "Avatar Updated Successfully"));
});
export { User, UserDetails, UploadeUserAvatar };
