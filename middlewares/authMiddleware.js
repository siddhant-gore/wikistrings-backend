import JWT from 'jsonwebtoken';
import  User from '../models/userModel.js';
import ErrorHandler from '../utils/errorHandler.js';

// Middleware to authenticate the user using JWT token
export async function auth(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return next(new ErrorHandler('Invalid token format', 401));
  }

  try {
    const decodedToken = JWT.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken.id);

    if (!user) {
      return next(new ErrorHandler('User not found', 404));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorHandler('Invalid token', 401));
  }
}

// Middleware to check if the user is an admin
export async function isAdmin(req, res, next) {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('+password');

    if (!user) {
      return next(new ErrorHandler('Invalid token. User not found.', 401));
    }

    if (user.role !== "admin") {
      return next(new ErrorHandler('Restricted.', 401));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorHandler('Unauthorized.', 401));
  }
}
