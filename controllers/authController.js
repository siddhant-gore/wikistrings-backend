import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../utils/catchAsyncError.js";



//user

export const userRegister = catchAsyncError(async (req, res, next) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return next(new ErrorHandler("User already exists", 409));
  }

  const password = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  req.body.password = hashedPassword;

  const newuser = new User(req.body);

  const token = jwt.sign({ id: newuser._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const saveduser = await newuser.save();

  res.status(200).send({
    message: "User account created successfully",
    success: true,
    token: token,
    user: saveduser,
  });
});

export const userLogin = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User does not exist", 404));
  }

  const isMatch = bcrypt.compareSync(req.body.password, user.password);

  if (!isMatch) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.status(200).send({
    message: "Login successful",
    success: true,
    token: token,
    user: user,
  });
});



