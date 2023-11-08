import { Router } from "express";
const router = Router();

import { userRegister, userLogin } from "../controllers/authController.js";

//-------------------Registration-------------------------

router.post("/user-register", userRegister);


//---------------------Login--------------------------

router.post("/user-login", userLogin);


export default router;
