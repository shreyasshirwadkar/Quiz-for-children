import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
    addQuizType,
    correctans,
    deleteQues,
    deleteQuizType,
    editQuizName,
    getQuestionInfo,
    getQuiztypes,
    quesUpload,
    quizname,
    quizobject,
    randomques,
    showAllQuizType,
    showQuestion,
    updateQues,
} from "../controllers/ques.controlles.js";
import { upload } from "../middlewares/multer.middlewares.js";
const router = Router();
router.route("/quizName/:objectid").get(verifyJWT, quizname);
router.route("/postQuestion/:type").post(
    verifyJWT,
    upload.fields([
        {
            name: "ques",
            maxCount: 1,
        },
    ]),
    quesUpload
);
router.route("/getQuizTypeId/:type").get(quizobject);
router.route("/getQuestion/:type").post(randomques);
router.route("/checkAnswer").get(correctans);
router.route("/Question/:type").get(verifyJWT, showQuestion);
router
    .route("/Questioninfo/:type/:question_id")
    .get(verifyJWT, getQuestionInfo);
router.route("/deleteQuestion/:type/:question_id").get(verifyJWT, deleteQues);
router.route("/QuizTypes").get(verifyJWT, getQuiztypes);
router.route("/deleteQuiz/:type").get(verifyJWT, deleteQuizType);
router.route("/editQuizType/:type").patch(
    verifyJWT,
    upload.fields([
        {
            name: "quizTypeImage",
            maxCount: 2,
        },
    ]),
    editQuizName
);
router.route("/showAllQuizType").get(showAllQuizType);
router.route("/addQuizType").post(
    verifyJWT,
    upload.fields([
        {
            name: "quizImage",
            maxCount: 1,
        },
    ]),
    addQuizType
);
router.route("/updateQues/:type/:question_id").post(
    verifyJWT,
    upload.fields([
        {
            name: "ques",
            maxCount: 1,
        },
    ]),
    updateQues
);
export default router;
