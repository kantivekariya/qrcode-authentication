import express from "express";
import userController from "./auth.controller";
import { asyncWrapper } from "../../utils/asyncWrapper";
import auth from "../../middleware/auth.middleware";

const authRoutes = express.Router();

authRoutes.get("/", (req, res, next) => {
  res.json({ message: "from index api" });
});

/* register user */
authRoutes.post("/register", asyncWrapper(userController.register));

/* login user */
authRoutes.post("/login", asyncWrapper(userController.login));

/* get all users */
authRoutes.get("/users", auth, asyncWrapper(userController.findAll));

/* login user details */
authRoutes.get("/me", auth, asyncWrapper(userController.me));

/* get user by id */
authRoutes.get("/users/:userId", auth, asyncWrapper(userController.findOne));

/* update user by id */
authRoutes.put("/users/:userId", auth, asyncWrapper(userController.update));

/* delete user by id */
authRoutes.delete("/users/:userId", auth, asyncWrapper(userController.delete));

/* logout user */
authRoutes.get("/logout", auth, asyncWrapper(userController.logout));

/* generate dynamic qr-code */
authRoutes.get("/qr-code", asyncWrapper(userController.qrCode));

/* verify token qr-code */
authRoutes.post(
  "/verify-qrcode",
  auth,
  asyncWrapper(userController.verifyQrcode)
);

export { authRoutes };
