import JWT from "jsonwebtoken";
import "dotenv/config";

const secret = process.env.JWT_SECRET;

export function createToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    profilePicture: user.profilePicture,
    role: user.role,
  };
  const token = JWT.sign(payload, secret, { expiresIn: process.env.JWT_EXPIRES_IN });
  return token;
}

export function verifyToken(token) {
  try {
    const payload = JWT.verify(token, secret);
    return payload;
  } catch (error) {
    return error;
  }
}
