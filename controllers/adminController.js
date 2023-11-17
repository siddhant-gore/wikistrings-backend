import User from "../models/userModel.js";
import GuitarString from "../models/guitarStringModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../utils/catchAsyncError.js";
import APIFeatures from "../utils/apiFeatures.js";
import { s3Uploadv2, upload } from "../utils/s3.js";
import multer from "multer";


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



export const createGuitar = catchAsyncError(async(req,res,next)=>{
  const { guitarName, strings } = req.body;
 
  if (!guitarName || !strings || !Array.isArray(strings)) {
    return res.status(400).json({ error: 'Invalid request body.' });
  }

 
  const newGuitarString = new GuitarString({
    guitarName,
    strings,
  });

  
  await newGuitarString.save();

 
  return res.status(201).json({success: true, newGuitarString});

})



export const getGuitars = catchAsyncError(async(req,res,next)=>{

  const apiFeature = new APIFeatures(GuitarString.find().sort({createdAt: -1}), req.query)

  if (req.query.resultPerPage && req.query.currentPage) {
    apiFeature.pagination();
  }

  const guitars = await apiFeature.query;

  const guitarsCount = await GuitarString.countDocuments();

    res.status(200).json({success:true, guitars, guitarsCount});
})

export const getGuitarById = catchAsyncError(async(req,res,next)=>{

  const guitarId = req.params.id;

  const guitar = await GuitarString.findById(guitarId);

  if (!guitar) {
    return next(new ErrorHandler("Guitar not found", 404));
  }

    res.status(200).json({success:true, guitar});
})

export const deleteGuitarById = catchAsyncError(async(req,res,next)=>{

  const guitarId = req.params.id;
  
  const deletedGuitar = await GuitarString.findByIdAndDelete(guitarId);

  if (!deletedGuitar) {
    return next(new ErrorHandler("Guitar not found", 404));
  }

    res.status(200).json({success:true, deletedGuitar});
})

export const updateGuitarById = catchAsyncError(async(req,res,next)=>{

  const guitarId = req.params.id;
  
  const updatedGuitar = await GuitarString.findByIdAndUpdate(guitarId,req.body, {
    new:true
  });

  if (!updatedGuitar) {
    return next(new ErrorHandler("Guitar not found", 404));
  }

    res.status(200).json({success:true, updatedGuitar});
})



export const uploadAudio = catchAsyncError(async (req, res, next) => {
 
    const { originalname, buffer } = req.file;

    const s3Response = await s3Uploadv2({
      originalname,
      buffer,
    });

    
    return res.status(200).json({success:true, message: 'Audio file uploaded successfully.', s3Response });
  
});



