import { Router } from "express";
import { getGuitarById, getGuitars } from "../controllers/guitarController.js";
const router = Router();



router.get('/guitar',getGuitars);
router.get('/guitar/:id',getGuitarById);




export default router;