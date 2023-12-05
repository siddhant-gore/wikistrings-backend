import { Router } from "express";
import { createBrand, createGuitar, createMaterial, deleteBrand, deleteGuitarById, deleteMaterial, getAllUsers,  getBrands,  getGuitarById,  getGuitars, getMaterials, getOptions, getSummary, getUserById,  updateAdmin, updateGuitarById, updateUserById, uploadAudio, uploadImage,  } from "../controllers/adminController.js";
import { upload } from "../utils/s3.js";


const router = Router();

router.get("/summary", getSummary);

router.put('/update',updateAdmin);
router.get('/users',getAllUsers);
router.get('/users/:id',getUserById);
router.put('/users/:id',updateUserById);

//--Guitar--


router.post("/guitar", createGuitar);
router.get("/guitar", getGuitars);
router.get("/guitar/:id", getGuitarById);
router.put("/guitar/:id", updateGuitarById);
router.delete("/guitar/:id", deleteGuitarById);

router.get("/options", getOptions);

router.post("/brand", createBrand);
router.get("/brand", getBrands);
router.delete("/brand/:id", deleteBrand);

router.post("/material", createMaterial);
router.get("/material", getMaterials);
router.delete("/material/:id", deleteMaterial);

router.post("/audio",upload.single('audio'),uploadAudio);
router.post("/image",upload.single('image'),uploadImage);

export default router;