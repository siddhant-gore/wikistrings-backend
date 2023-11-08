import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../utils/catchAsyncError.js";


export const getUserProfile = catchAsyncError(async(req,res,next)=>{

   const userId = req.user.id;

   const user = await User.findById(userId);

   
    if (!user){
     return next(new ErrorHandler('User not found', 404));
    }


res.status(200).json({ success: true, user });

});


export const updateUserProfile = catchAsyncError(async (req, res, next) => {
    const userId = req.user.id;
  
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
  
    if (!updatedUser) {
      return next(new ErrorHandler('User not found', 404));
    }
  
    res.status(200).json({ success: true, user: updatedUser });
  });
  