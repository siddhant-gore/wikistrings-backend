import { Router } from "express";
import { getAcousticGuitars, getElectricGuitars, getGuitarById, getGuitars, removeAllArtistFields } from "../controllers/guitarController.js";
const router = Router();



router.post('/artist',removeAllArtistFields);
router.get('/guitar',getGuitars);
router.get('/guitar/electric',getElectricGuitars);
router.get('/guitar/acoustic',getAcousticGuitars);
router.get('/guitar/:id',getGuitarById);




export default router;