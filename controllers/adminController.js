import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../utils/catchAsyncError.js";
import APIFeatures from "../utils/apiFeatures.js";


export const updateAdmin = catchAsyncError(async(req,res,next)=>{

  const userId = req.user.id;
  const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
  
  if (!updatedUser) {
    return next(new ErrorHandler('User not found', 404));
  }

  res.status(200).json({ success: true, user: updatedUser });

})

export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const apiFeature = new APIFeatures(User.find().sort({ createdAt: -1 }), req.query);

  if (req.query.resultPerPage && req.query.currentPage) {
    apiFeature.pagination();
  }

  const users = await apiFeature.query;
  const usersCount = await User.countDocuments();
  res.status(200).json({ success: true, users, usersCount });
});


export const getUserById = catchAsyncError(async (req, res, next) => {
  const userId = req.params.id;

  const user = await User.findById(userId);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  

  res.status(200).json({ success: true, user });
});

export const updateUserById = catchAsyncError(async(req,res,next)=>{

    const userId = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(userId,req.body,{new:true});

    if(!updatedUser){
        return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({ success: true, user:updatedUser });

}) 