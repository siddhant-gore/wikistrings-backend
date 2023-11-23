import Guitar from "../models/guitarModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../utils/catchAsyncError.js";
import APIFeatures from "../utils/apiFeatures.js";


export const getGuitars = catchAsyncError(async(req,res,next)=>{

  const apiFeature = new APIFeatures(Guitar.find().sort({ createdAt: -1 }), req.query).search();

  let guitars = await apiFeature.query;
  let guitarsCount = guitars.length;

  if (req.query.resultPerPage && req.query.currentPage) {
    apiFeature.pagination();
    guitars = await apiFeature.query.clone(); 
  }

  

  res.status(200).json({ success: true, guitars, guitarsCount });
  })


export const getElectricGuitars = catchAsyncError(async(req,res,next)=>{

    const apiFeature = new APIFeatures(Guitar.find({type:'electric'}).sort({ createdAt: -1 }), req.query).search(); 

  let guitars = await apiFeature.query;
  let guitarsCount = guitars.length;

  if (req.query.resultPerPage && req.query.currentPage) {
    apiFeature.pagination();
    guitars = await apiFeature.query.clone(); 
  } 

  res.status(200).json({ success: true, guitars, guitarsCount });
  })

export const getAcousticGuitars = catchAsyncError(async(req,res,next)=>{

  const apiFeature = new APIFeatures(Guitar.find({type:'acoustic'}).sort({ createdAt: -1 }), req.query).search();

  let guitars = await apiFeature.query;
  let guitarsCount = guitars.length;

  if (req.query.resultPerPage && req.query.currentPage) {
    apiFeature.pagination();
    guitars = await apiFeature.query.clone(); 
  }

  

  res.status(200).json({ success: true, guitars, guitarsCount });
  })
  
  export const getGuitarById = catchAsyncError(async(req,res,next)=>{
  
    const guitarId = req.params.id;
  
    const guitar = await Guitar.findById(guitarId);
  
    if (!guitar) {
      return next(new ErrorHandler("Guitar not found", 404));
    }
  
      res.status(200).json({success:true, guitar});
  })