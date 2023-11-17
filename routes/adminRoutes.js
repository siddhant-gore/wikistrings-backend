import { Router } from "express";
import { createGuitar, deleteGuitarById, getAllUsers,  getGuitarById,  getGuitars, getUserById,  updateAdmin, updateGuitarById, updateUserById, uploadAudio,  } from "../controllers/adminController.js";
import { upload } from "../utils/s3.js";


const router = Router();

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
router.post("/audio",upload.single('audio'),uploadAudio);

export default router;