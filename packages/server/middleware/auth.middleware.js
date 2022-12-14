import jwt from "jsonwebtoken";
import { UserModel } from "../module/auth/auth.model.js";
import config from "../config.js";
import httpStatus from "../utils/httpStatus.js";

const auth = async (req, res, next) => {
  const token = req.header("authorization");
  if (token) {
    try {
      const decoded = jwt.verify(token, config.jwt.key);
      const user = await UserModel.findOne({
        _id: decoded.sub,
        "tokens.token": token,
      });
      if (!user) {
        return res.status(httpStatus.UNAUTHORIZED).send({
          status: "ERROR",
          message: "Auth-Token is not valid",
        });
      }
      req.token = token;
      req.user = user;
      next();
    } catch (e) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        status: "ERROR",
        message: "Auth-Token is not valid",
      });
    }
  } else {
    return res.status(httpStatus.UNAUTHORIZED).send({
      status: "ERROR",
      message: "Auth-Token not set in header",
    });
  }
};

export default auth;
