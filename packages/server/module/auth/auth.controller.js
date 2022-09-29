import QRCode from "qrcode";
import { v4 as uuidv4 } from "uuid";
import { UserModel } from "./auth.model.js";
import httpStatus from "../../utils/httpStatus.js";
import { QrCodeModel } from "./qrcode.model.js";
import {
  emitToSpecificSocket,
  socketEvents,
} from "../../config/socketconnect.js";

const userController = {};

/* create User */
userController.register = async (req, res, next) => {
  try {
    const isExistingUser = await UserModel.findOne({ email: req.body.email });
    if (isExistingUser) {
      return res.status(httpStatus.CONFLICT).json({
        message: "Email Already Exists!",
        status: "SUCCESS",
      });
    } else {
      const user = new UserModel(req.body);
      await user.save();
      return res.status(httpStatus.CREATED).json({ data: { user } });
    }
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "ERROR",
      message: e.message,
    });
  }
};

/* login user */
userController.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    return res.status(httpStatus.OK).json({
      message: "Auth successful",
      status: "SUCCESS",
      token: token,
      user,
    });
  } catch (e) {
    if (e.message === "Unable to login") {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: "Auth failed!",
        status: "ERROR",
      });
    }

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "ERROR",
      message: e.message,
    });
  }
};

/* get all users */
userController.findAll = async (req, res) => {
  try {
    let users = await UserModel.find();
    return res.json(users);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

/* auth login user */
userController.me = async (req, res) => {
  return res.json({
    data: {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      phone: req.user.phone,
      country: req.user.country,
      address: req.user.address,
    },
  });
};

/* get user by id */
userController.findOne = async (req, res) => {
  try {
    let user = await UserModel.findById(req.params.userId);
    if (!user) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "User not found", status: "ERROR" });
    }
    return res.json(user);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

/* update user by id */
userController.update = async (req, res) => {
  try {
    let user = await UserModel.findById(req.params.userId);
    if (!user) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "User not found", status: "ERROR" });
    }
    Object.assign(user, req.body);
    await user.save();
    return res.json({
      message: "User update successfully!",
      status: "SUCCESS",
      user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
};

/* delete user by id */
userController.delete = async (req, res) => {
  try {
    let user = await UserModel.findByIdAndRemove(req.params.userId);
    if (!user) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "User not found", status: "ERROR" });
    }
    return res.json({
      message: "User deleted successfully!",
      status: "SUCCESS",
    });
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
};

/* generate dynamic qr code */
userController.qrCode = async (req, res) => {
  try {
    const { socketId } = req.body;
    const uniqueKey = uuidv4();
    await QrCodeModel.deleteMany();
    const dynamicQRCode = await new QrCodeModel({
      qrcode: uniqueKey,
      socketId,
    });
    await dynamicQRCode.save();
    QRCode.toDataURL(
      uniqueKey,
      { rendererOpts: { quality: 5 }, version: 8 },
      (err, url) => {
        res.send({
          qrCode: url,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
};

/* user logout */
userController.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token != req.token
    );
    await req.user.save();

    return res.status(httpStatus.OK).json({ message: "Logout Successfully!" });
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "ERROR",
      message: e.message,
    });
  }
};

/* verify token */
userController.verifyQrcode = async (req, res) => {
  try {
    const { qrCodeToken } = req.body;

    const userToken = await QrCodeModel.findOne({ qrcode: qrCodeToken });

    if (userToken) {
      // TODO : create and send token to client-browser using socket
      const token = await req.user.generateAuthToken();

      emitToSpecificSocket(userToken.socketId, socketEvents.AUTH_TOKEN, {
        token,
      });

      return res.status(httpStatus.OK).json({
        message: "Successfully login",
        status: "SUCCESS",
      });
    }
    return res.status(httpStatus.BAD_REQUEST).json({
      message: "QR code is invalid",
    });
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "ERROR",
      message: e.message,
    });
  }
};

export default userController;
