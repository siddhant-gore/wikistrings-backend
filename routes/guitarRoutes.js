import { Router } from "express";
import { getAcousticGuitars, getAllStrings, getElectricGuitars, getGuitarById, getGuitars } from "../controllers/guitarController.js";
const router = Router();



router.get('/guitar',getGuitars);
router.get('/strings',getAllStrings);
router.get('/guitar/electric',getElectricGuitars);
router.get('/guitar/acoustic',getAcousticGuitars);
router.get('/guitar/:id',getGuitarById);




export default router;