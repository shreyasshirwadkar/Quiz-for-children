// ques.controllers.js

import { Questions } from "../models/ques.models.js";
import { User } from "../models/user.models.js";
import ApiError from "../utils/apiError.utils.js";
import asyncHandler from "../utils/asyncHandler.utils.js";
import { ApiResponse } from "../utils/apiResponse.utils.js";
import { uploadoncloudinary } from "../utils/cloudinary.utils.js";

const quesUpload = asyncHandler(async (req, res) => {
  const {type}=req.params;
  const {opt, correct } = req.body;
  const quesLocalPath=req.files?.ques[0].path
  // Validate required fields
  if (!type) {
    throw new ApiError(400, "Type is not defined");
  }
  if (!quesLocalPath) {
    throw new ApiError(400, "Question local path not defined");
  }
  if (!opt) {
    throw new ApiError(400, "Options should be an array of 4 elements");
  }
  if (!correct) {
    throw new ApiError(400, "Correct answer is not defined");
  }
   // Find the user
   const user = await User.findById(req.user?._id);
   if (!user) {
     throw new ApiError(400, "User not found");
    }
    // Check if there is already a type of question for the user
    const typeOfQuestion = await Questions.findOne({ type, owner: user._id });    
    if (!typeOfQuestion) {  
      throw new ApiError(400, "Type of quiz not found");
         // Create a new type of question if it doesn't exist
        
  //   const firstques = await Questions.create({
  //     type,
  //     owner:req.user?._id,
  //     questions:[{question:quesUrl,options:opt,correct:correct}]

      
  //   });

  //   if (!firstques) {
  //     throw new ApiError(400, "Error in creating new type");
  //   }    // Respond with success message
  //   const que = await Questions.findById(firstques._id).select(
  //     "-questions.correct"
  //   );
  //   return res
  //     .status(200)
  //     .json(new ApiResponse(200, que, "New type of question created"));
   }

  // Add new question to existing type
  const question=await uploadoncloudinary(quesLocalPath)
  if(!question.url){
    throw new ApiError(400, "Question not uploaded")
  }
   const quesUrl=question.url
  
  typeOfQuestion.questions.push({
    question:quesUrl,
    options:opt,
    correct,
  });

  await typeOfQuestion.save({ validateBeforeSave: false });

  // Respond with success message
  const que = await Questions.findById(typeOfQuestion._id).select(
    "-questions.correct"
  );
  return res.status(200).json(new ApiResponse(200, que, "Question added"));
 });
const randomques=asyncHandler(async(req,res)=>{
  const {type}=req.params;
if(!type){
  throw new ApiError(400, "Please provide type of question");

}
const typeOfQuestion=await Questions.findOne({type})
if(!typeOfQuestion){
  throw new ApiError(400, "No questions of this type exist");}
  const randomques=typeOfQuestion.questions[Math.floor(Math.random()*typeOfQuestion.questions.length)]
  if(!randomques){
    throw new ApiError(400,"Error in finding random question")
  }
  const questionWithoutCorrect  = randomques;
  return res.status(200)
  
  .json(new ApiResponse(200, {questionWithoutCorrect}, "Random question found"));
  
})
const correctans=asyncHandler(async(req,res)=>{
  const{type,question,selectedOption,own}=req.query;
  if(!own){
    throw new ApiError(400, "Please provide owner of question");
  }
  if(!type){
    throw new ApiError(400, "Please provide type of question");}
    if(!selectedOption){
      throw new ApiError(400, "Please select an option");
    }
    if(!question){
      throw new ApiError(400, "Please provide question");
    }
    const typeOfQuestion=await Questions.findOne({$and:[{type},{owner:own}]})
    if(!typeOfQuestion){
      throw new ApiError(400, "No questions of this type exist");
    }
    const questionOfThisType=await typeOfQuestion.questions.find(q => q.question === question)
    if(!questionOfThisType){
      throw new ApiError(400, "No question of this type exist");
    }
    const correctans=questionOfThisType.correct
    if(correctans===selectedOption){ 
      return res.status(200).json(new ApiResponse(200,true,"Correct ans"))}
      else{
        return res.status(200).json(new ApiResponse(200,false,"Incorrect ans"))
      }

})
const showQuestion=asyncHandler(async(req,res)=>{
  const{type}=req.params;
  if(!type){
    throw new ApiError(400, "Please provide type of question");
    }
  const user=await User.findById(req.user?._id)
  if(!user){
    throw new ApiError(400, "User not found");
    }
    const typeOfQuestion=await Questions.findOne({$and:[{type},{owner:user._id}]})
    if(!typeOfQuestion){
      throw new ApiError(400, "No questions of this type exist");
      }
      const questionOfThisType=await typeOfQuestion.questions
      if(questionOfThisType.length===0){
        throw new ApiError(400, "No questions are uploaded");
      }
      return res.status(200).json(new ApiResponse(200,questionOfThisType,"Question fetched successfully!!!"))
})
const getQuestionInfo=asyncHandler(async(req,res)=>{
  const{type,question_id}=req.params;
  if(!type){
    throw new ApiError(400, "Please provide type of question");
    }
    if(!question_id){
      throw new ApiError(400, "Please provide question id");
      }
    const user=await User.findById(req.user?._id);
    if(!user){
      throw new ApiError(400, "User not found");
      }
      const typeOfQuestion=await Questions.findOne({$and:[{type},{owner:user._id}]})
      if(!typeOfQuestion){
        throw new ApiError(400, "No questions of this type exist");
        }
        const questionOfThisType=await typeOfQuestion.questions.find(q => q._id.toString()=== question_id)
          if(!questionOfThisType){
            throw new ApiError(400, "No question of this type exist");
            }
            return res.status(200).json(new ApiResponse(200,questionOfThisType,"Question fetched successfully!!!"))





    })
    const updateQues = asyncHandler(async (req, res) => {
      const { type, question_id } = req.params;
      const { opt, correct } = req.body;
      const file = req.files?.ques?.[0]?.path;
    
      if (!type) {
        throw new ApiError(400, "Please provide the type of question");
      }
      if (!question_id) {
        throw new ApiError(400, "Please provide the question ID");
      }
      if (!opt) {
        throw new ApiError(400, "Please provide options");
      }
      if (!correct) {
        throw new ApiError(400, "Please provide the correct option");
      }
    
      const user = await User.findById(req.user?._id);
      if (!user) {
        throw new ApiError(400, "User not found");
      }
    
      const typeOfQuestion = await Questions.findOne({
        type,
        owner: user._id,
      });
    
      if (!typeOfQuestion) {
        throw new ApiError(400, "No questions of this type exist");
      }
    
      const questionIndex = typeOfQuestion.questions.findIndex(
        (q) => q._id.toString() === question_id
      );
      if (questionIndex === -1) {
        throw new ApiError(400, "No question of this type exist");
      }
    
      let quesUrl = typeOfQuestion.questions[questionIndex].question;
      if (file) {
        const question = await uploadoncloudinary(file);
        if (!question.url) {
          throw new ApiError(400, "Question not uploaded");
        }
        quesUrl = question.url;
      }
    
      typeOfQuestion.questions[questionIndex].question = quesUrl;
      typeOfQuestion.questions[questionIndex].options = opt;
      typeOfQuestion.questions[questionIndex].correct = correct;
    
      await typeOfQuestion.save({ validateBeforeSave: false });
    
      const updatedQuestion = typeOfQuestion.questions[questionIndex];
    
      return res
        .status(200)
        .json(new ApiResponse(200, updatedQuestion, "Question updated successfully"));
    });
const deleteQues=asyncHandler(async(req,res)=>{
  const{type,question_id}=req.params;
  if(!type){
    throw new ApiError(400, "Please provide type of question");
    }
    if(!question_id){
      throw new ApiError(400, "Please provide question id");
      }
      const user=await User.findById(req.user?._id)
      if(!user){
        throw new ApiError(400, "User not found");
        }
        const typeOfQuestion=await Questions.findOne({$and:[{type},{owner:user._id}]})
        if(!typeOfQuestion){
          throw new ApiError(400, "No questions of this type exist");
          }
          const questionOfThisType=await typeOfQuestion.questions.find(q => q._id.toString()
          === question_id)
          if(!questionOfThisType){
            throw new ApiError(400, "No question of this type exist");
            }
            const quesDel=await typeOfQuestion.questions.remove(questionOfThisType)
            await typeOfQuestion.save();
            if(!quesDel){
              throw new ApiError(400, "Question not deleted");
            }
            return res.status(200).json(new ApiResponse(200,quesDel,"Question deleted successfully!!!"))


})
const getQuiztypes=asyncHandler(async(req,res)=>{
  const user=await User.findById(req.user?._id)
  if(!user){
    throw new ApiError(400, "User not found");
    }
    const quizTypes=await Questions.find({owner:user._id})
    if(!quizTypes){
      throw new ApiError(400, "No quiz types exist");
      }
      const quizes={};
      quizTypes.forEach((quizType)=>{
        quizes[quizType.type]=quizType.questions.length
        })

      return res.status(200).json(new ApiResponse(200,quizes,"Quiz types fetched successfully!!!"))

})
const addQuizType=asyncHandler(async(req,res)=>{
  const{type}=req.body;
  if(!type){
    throw new ApiError(400, "Please provide type of question");
    }
    const user=await User.findById(req.user?._id)
    if(!user){
      throw new ApiError(400, "User not found");
      }
      const typeOfQuestion=await Questions.findOne({$and:[{type},{owner:user._id}]})
      if(typeOfQuestion){
        throw new ApiError(400, "Quiz type already exist");
        }
        const newQuizType=await Questions.create({type,owner:user._id});
        if(!newQuizType){
          throw new ApiError(400, "Quiz type not created");
          }
          return res.status(200).json(new ApiResponse(200,newQuizType,"Quiz type created successfully!!!"))
})
export { quesUpload,randomques,correctans,showQuestion,updateQues,getQuestionInfo,deleteQues,getQuiztypes,addQuizType};
