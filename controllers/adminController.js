import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../utils/catchAsyncError.js";
import APIFeatures from "../utils/apiFeatures.js";
import { s3Uploadv2, upload } from "../utils/s3.js";
import Guitar from "../models/guitarModel.js";
import Brand from "../models/brandModel.js";
import Material from "../models/materialModel.js";


export const updateAdmin = catchAsyncError(async(req,res,next)=>{

  const userId = req.user.id;
  const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
  
  if (!updatedUser) {
    return next(new ErrorHandler('User not found', 404));
  }

  res.status(200).json({ success: true, user: updatedUser });

})

export const getSummary = catchAsyncError(async(req,res,next)=>{

  const usersCount = await User.countDocuments();
  const guitarsCount = await Guitar.countDocuments();

  res.status(200).json({ success: true, usersCount, guitarsCount });


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



export const createGuitar = catchAsyncError(async(req, res, next) => {
  const { guitarName, guitarPic, type, artist, brand, material, affiliateLink, strings } = req.body;

  if (!guitarName || !strings || !Array.isArray(strings)) {
    return res.status(400).json({ error: 'Invalid request body.' });
  }
  const newGuitar = new Guitar({
    guitarName,
    guitarPic,
    type,
    artist,
    brand,
    material,
    affiliateLink,
    strings,
  });

  await newGuitar.save();

  return res.status(201).json({ success: true, newGuitar });
});


export const getGuitars = catchAsyncError(async (req, res, next) => {
  const apiFeature = new APIFeatures(Guitar.find().sort({createdAt: -1}), req.query).search();

  let guitars = await apiFeature.query;
  let guitarsCount = guitars.length;

  if (req.query.resultPerPage && req.query.currentPage) {
    apiFeature.pagination();
    guitars = await apiFeature.query.clone();
  }  

  res.status(200).json({ success: true, guitars, guitarsCount });
});


export const getGuitarById = catchAsyncError(async(req,res,next)=>{

  const guitarId = req.params.id;

  const guitar = await Guitar.findById(guitarId);

  if (!guitar) {
    return next(new ErrorHandler("Guitar not found", 404));
  }

    res.status(200).json({success:true, guitar});
})

export const deleteGuitarById = catchAsyncError(async(req,res,next)=>{

  const guitarId = req.params.id;
  
  const deletedGuitar = await Guitar.findByIdAndDelete(guitarId);

  if (!deletedGuitar) {
    return next(new ErrorHandler("Guitar not found", 404));
  }

    res.status(200).json({success:true, deletedGuitar});
})

export const updateGuitarById = catchAsyncError(async(req,res,next)=>{

  const guitarId = req.params.id;
  
  const updatedGuitar = await Guitar.findByIdAndUpdate(guitarId,req.body, {
    new:true
  });

  if (!updatedGuitar) {
    return next(new ErrorHandler("Guitar not found", 404));
  }

    res.status(200).json({success:true, updatedGuitar});
})


export const createMaterial = catchAsyncError(async(req,res,next)=>{

  const { name } = req.body;
  const material = await Material.create({ name });


  res.status(201).json({ success: true, material })

})

export const getOptions = catchAsyncError(async(req,res,next)=>{

  const brands = await Brand.find();
  const materials = await Material.find();

  res.status(200).json({ success: true, brands, materials })

})

export const getMaterials = catchAsyncError(async(req,res,next)=>{

  const material = await Material.find();

  res.status(200).json({ success: true, material })

})

export const deleteMaterial = catchAsyncError(async(req,res,next)=>{


  const material = await Material.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, material })

})
export const createBrand = catchAsyncError(async(req,res,next)=>{

  console.log(req.body);
  const { name } = req.body;


  if (!name) {
    return res.status(400).json({ success: false, message: 'Name is required' });
  }
  const brand = await Brand.create({ name });


  res.status(201).json({ success: true, brand })

})

export const getBrands = catchAsyncError(async(req,res,next)=>{

  const brands = await Brand.find();

  res.status(200).json({ success: true, brands })

})

export const deleteBrand = catchAsyncError(async(req,res,next)=>{


  const brand = await Brand.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, brand })

})


export const uploadAudio = catchAsyncError(async (req, res, next) => {
  const { originalname, buffer } = req.file;


  const s3Response = await s3Uploadv2({
    originalname,
    buffer,
    onProgress: (loaded, total) => {
      try {
        const percent = Math.round((loaded * 100) / total);
        console.log(`Progress: ${percent}%`);
        res.write(`data: ${JSON.stringify({ progress: percent })}\n\n`);
      } catch (error) {
        console.error('Error sending SSE update:', error);
      }
    },
  });
  

  return res.status(200).json({ success: true, message: 'Audio file uploaded successfully.', s3Response });
});


export const uploadImage = catchAsyncError(async (req, res, next) => {
  const { originalname, buffer } = req.file;

  const s3Response = await s3Uploadv2({
    originalname,
    buffer,
    onProgress: (loaded, total) => {
      try {
        const percent = Math.round((loaded * 100) / total);
        console.log(`Progress: ${percent}%`);
        res.write(`data: ${JSON.stringify({ progress: percent })}\n\n`);
      } catch (error) {
        console.error('Error sending SSE update:', error);
      }
    },
  });
  

  return res.status(200).json({ success: true, message: 'Image file uploaded successfully.', s3Response });
});




