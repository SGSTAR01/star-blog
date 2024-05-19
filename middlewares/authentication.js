import { verifyToken } from "../services/authentication.js";

export function checkAuthCookie(cookieName) {
  return function (req, res, next) {
    const token = req.cookies[cookieName];
    if (!token) {
      return next();
    }
    try {
        const payload = verifyToken(token);
        req.user = payload;  
    } catch (error) {
        console.error(error);
    }
    return next();
  };
}
