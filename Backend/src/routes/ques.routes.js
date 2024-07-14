import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { correctans, quesUpload, randomques } from "../controllers/ques.controlles.js";
import { upload } from "../middlewares/multer.middlewares.js";
const router=Router()
router.route("/postQuestion").post(verifyJWT,upload.fields([{
    name:"ques",
    maxCount:1
}]),quesUpload)
router.route("/getQuestion/:type").get(randomques)
router.route("/checkAnswer").post(correctans)
export default router