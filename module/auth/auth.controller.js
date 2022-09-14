import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import QRCode from "qrcode";
import { UserModel } from "./auth.model";
import httpStatus from "../../utils/httpStatus";
import { qrCodeModel } from "./qrcode.model";

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
      if (req.body.password) {
        user.hash = await bcrypt.hashSync(req.body.password, 10);
      }
      user.password = user.hash;
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
    const user = await UserModel.findOne({ email: email });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ sub: user.id }, process.env.NODE_JWT_KEY, {
        expiresIn: process.env.NODE_JWT_EXPIRATION,
      });
      return res.status(httpStatus.OK).json({
        message: "Auth successful",
        token: token,
      });
    } else {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: "Auth failed!",
      });
    }
  } catch (e) {
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
userController.qrcode = async (req, res) => {
  const randomString = (length) =>
    [...Array(length)]
      .map(() => (~~(Math.random() * 36)).toString(36))
      .join("");
  const dynamicToken = jwt.sign(
    { sub: randomString(14) },
    process.env.NODE_JWT_KEY,
    {
      expiresIn: process.env.NODE_JWT_EXPIRATION,
    }
  );
  const dynamicOrCode = await new qrCodeModel({ qrcode: dynamicToken });
  await dynamicOrCode.save();
  QRCode.toDataURL(dynamicToken, (err, url) => {
    res.send({ qrcode: url });
  });
};

export default userController;