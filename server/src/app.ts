import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import ErrorHandler from "./utils/ErrorHandler";
import helmet from "helmet";
import { generalLimiter } from "./libs/ExpressLimitter";
import { config } from "./config";
import userRoute from "./v1/routes/User.route";
import authRoute from "./v1/routes/Auth.route";
import { productroute } from "./v1/routes/Product.route";
import { favProductsRouter } from "./v1/routes/FavProducts.route";
import { categoryRouter } from "./v1/routes/Category.route";
import { cartRouter } from "./v1/routes/Cart.route";
import { reviewRouter } from "./v1/routes/Review.route";
import { checkoutRouter } from "./v1/routes/Checkout.route";
import vendorDashBoardRoute from "./v1/routes/VendorDashboard.route";
dotenv.config();

const app = express();
const isProduction = config.nodeENV === "production";
const allowedOrigins = [
  process.env.CORS_ORIGIN_PROD!,
  "http://localhost:5173",
  // isProduction ? config.corsOriginProd! : config.corsOrigindev!,
];
// Use morgan for HTTP request logs (pipe it to Winston)
// app.use(
//   morgan("combined", {
//     stream: {
//       write: (message) => logger.info(message.trim()),
//     },
//   })
// );
//  middlewares
app.use(
  cors({
    origin: "https://ritik-essentials-frontend.onrender.com",
    methods: ["PUT", "GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.use(helmet());
// generalLimiter is a rate limiter to prevent abuse
app.use(generalLimiter);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// routes
app.use("/api/v1", authRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", productroute);
app.use("/api/v1", favProductsRouter);
app.use("/api/v1", categoryRouter);
app.use("/api/v1", cartRouter);
app.use("/api/v1", reviewRouter);
app.use("/api/v1", checkoutRouter);
app.use("/api/v1", vendorDashBoardRoute);
// ⛔ Global Error Handler
app.use(ErrorHandler);

export default app;
