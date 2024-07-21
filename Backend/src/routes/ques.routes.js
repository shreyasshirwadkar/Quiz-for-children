import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { correctans, getQuestionInfo, quesUpload, randomques, showQuestion } from "../controllers/ques.controlles.js";
import { upload } from "../middlewares/multer.middlewares.js";
const router=Router()
router.route("/postQuestion").post(verifyJWT,upload.fields([{
    name:"ques",
    maxCount:1
}]),quesUpload)
router.route("/getQuestion/:type").get(randomques)
router.route("/checkAnswer").get(correctans)
router.route("/Question/:type").get(verifyJWT,showQuestion);
router.route("/Questioninfo/:type/:quesId").get(verifyJWT,getQuestionInfo)
export default router