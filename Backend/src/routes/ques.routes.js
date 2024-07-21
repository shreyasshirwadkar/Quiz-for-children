import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { addQuizType, correctans, deleteQues, getQuestionInfo, getQuiztypes, quesUpload, randomques, showQuestion, updateQues } from "../controllers/ques.controlles.js";
import { upload } from "../middlewares/multer.middlewares.js";
const router=Router()
router.route("/postQuestion/:type").post(verifyJWT,upload.fields([{
    name:"ques",
    maxCount:1
}]),quesUpload)
router.route("/getQuestion/:type").get(randomques)
router.route("/checkAnswer").get(correctans)
router.route("/Question/:type").get(verifyJWT,showQuestion);
router.route("/Questioninfo/:type/:question_id").get(verifyJWT,getQuestionInfo)
router.route("/deleteQuestion/:type/:question_id").get(verifyJWT,deleteQues)
router.route("/QuizTypes").get(verifyJWT,getQuiztypes)
router.route("/addQuizType").post(verifyJWT,addQuizType)
router.route("/updateQues/:type/:question_id").post(verifyJWT,upload.fields([{
    name:"ques",
    maxCount:1
}]),updateQues)
export default router