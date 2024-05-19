import { scrypt, randomBytes } from "node:crypto";
import { Schema, model } from "mongoose";
import {createToken} from "../services/authentication.js"

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    profilePicture: {
      type: String,
      default: "/images/default_dp.png",
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return;
  }
  const salt = randomBytes(16).toString("hex");
  try {
    const derivedKey = await new Promise((resolve, reject) => {
      scrypt(user.password, salt, 64, (err, derivedKey) => {
        if (err) {
          reject(err);
        }
        resolve(derivedKey);
      });
    });
    user.password = derivedKey.toString("hex");
    user.salt = salt;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePasswordAndGenerateToken = async function (candidatePassword) {
  const user = this;
  try {
    const derivedKey = await new Promise((resolve, reject) => {
      scrypt(candidatePassword, user.salt, 64, (err, derivedKey) => {
        if (err) {
          reject(err);
        }
        resolve(derivedKey);
      });
    });
    if (derivedKey.toString("hex") === user.password) {
      return createToken(user);
    } else {
      return false;
    }
  } catch (err) {
    throw err;
  }
};

const User = model("User", userSchema);

export default User;
