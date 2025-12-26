import express from "express";
import { isVendor } from "../middlewares/IsVendor.middleware";
import Authenticate from "../middlewares/Authtenticate.middleware";
import { CreateCategory } from "../controllers/Category.controller";
const categoryRouter = express.Router();
categoryRouter.route("/category").post(Authenticate, isVendor, CreateCategory);
// categoryRouter.route("/categories").get(CreateCategory);

export { categoryRouter };
