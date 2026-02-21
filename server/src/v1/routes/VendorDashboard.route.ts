import express from "express";
import { isVendor } from "../middlewares/IsVendor.middleware";
import Authenticate from "../middlewares/Authtenticate.middleware";
import { GetVendorDashBoard } from "../controllers/VendorDashboard.controller";
const vendorDashBoardRoute = express.Router();
vendorDashBoardRoute
  .route("/dashboard")
  .get(Authenticate, isVendor, GetVendorDashBoard);

export default vendorDashBoardRoute;
