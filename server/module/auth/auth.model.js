import mongoose from "mongoose";
import jwt from "jsonwebtoken";

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

  const jwtToken = jwt.sign({ sub: user.id }, process.env.NODE_JWT_KEY, {
    expiresIn: process.env.NODE_JWT_EXPIRATION,
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

const UserModel = mongoose.model("user", userSchema);
export { UserModel };
