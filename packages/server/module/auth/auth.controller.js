import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import QRCode from "qrcode";
import { UserModel } from "./auth.model";
import httpStatus from "../../utils/httpStatus";
import { QrCodeModel } from "./qrcode.model";
import config from "../../config";
import { emitToSpecificSocket, socketEvents } from "../../config/socketconnect";

const userController = {};

/* create User */
userController.register = async (req, res, next) => {
  try {
    const isExistingUser = await UserModel.findOne({ email: req.body.email });
    if (isExistingUser) {
      return res.status(httpStatus.CONFLICT).json({
        message: "Mail Already Exists!",
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
      token: token,
      user,
    });
  } catch (e) {
    if (e.message === "Unable to login") {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: "Auth failed!",
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
        .json({ message: "User not found" });
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
        .json({ message: "User not found" });
    }
    Object.assign(user, req.body);
    await user.save();
    return res.json(user);
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
        .json({ message: "User not found" });
    }
    return res.json({ message: "User deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
};

/* generate dynamic qr code */
userController.qrCode = async (req, res) => {
  try {
    const { socketId } = req.body;

    const randomString = (length) =>
      [...Array(length)]
        .map(() => (~~(Math.random() * 36)).toString(36))
        .join("");
    const dynamicToken = jwt.sign({ sub: randomString(14) }, config.jwt.key, {
      expiresIn: config.jwt.expiration,
    });
    const dynamicOrCode = await new QrCodeModel({
      qrcode: dynamicToken,
      socketId,
    });
    await dynamicOrCode.save();
    QRCode.toDataURL(dynamicToken, (err, url) => {
      res.send({
        qrCode: url,
      });
    });
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
