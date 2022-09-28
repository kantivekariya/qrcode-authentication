import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../../config.js";

const schema = mongoose.Schema;

const userSchema = new schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

/**
 * Generate user auth token
 * @returns generated jwtToken
 */
userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const jwtToken = jwt.sign({ sub: user.id }, config.jwt.key, {
    expiresIn: config.jwt.expiration,
  });

  user.tokens = [...user.tokens, { token: jwtToken }];
  await user.save();

  return jwtToken;
};

/**
 * Modify object to send in JSON
 * @returns manipulated user object
 */
userSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();

  delete userObj.tokens;
  delete userObj.password;

  return userObj;
};

/**
 * Get user details using email and password
 * @param {*} email
 * @param {*} password
 * @returns user
 */
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    throw new Error("Unable to login");
  }

  return user;
};

/**
 * Encrypt password
 */
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const UserModel = mongoose.model("user", userSchema);
export { UserModel };
