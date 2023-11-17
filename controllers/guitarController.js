import GuitarString from "../models/guitarStringModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../utils/catchAsyncError.js";
import APIFeatures from "../utils/apiFeatures.js";


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