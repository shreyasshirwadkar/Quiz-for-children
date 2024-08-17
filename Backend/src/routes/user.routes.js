import { Router } from "express";
import { logInUser, logOutUser, registerUser } from "../controllers/user.controllers.js";
const router=Router()
router.route("/registerUser").post(registerUser)
router.route("/logoutUser").get(logOutUser)
router.route("/loginUser").post(logInUser)
export default router