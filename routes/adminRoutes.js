import { Router } from "express";
import { getAllUsers, getUserById, updateAdmin, updateUserById } from "../controllers/adminController.js";


const router = Router();


router.put('/update',updateAdmin);
router.get('/users',getAllUsers);
router.get('/users/:id',getUserById);
router.put('/users/:id',updateUserById);

export default router;