import { User } from "../models/user.models.js";
import ApiError from "../utils/apiError.utils.js";
import { ApiResponse } from "../utils/apiResponse.utils.js";
import asyncHandler from "../utils/asyncHandler.utils.js";
const generateTokens=async function(userId){
   try {
     const user=await User.findById(userId)
     const accessToken=await user.generateAccessToken()
     const refreshAccessToken=await user.generateRefreshAccessToken()
     user.refreshAccessToken=refreshAccessToken
     await user.save({validateBeforeSave:false})
     return {accessToken,refreshAccessToken}
   } catch (error) {
    throw new ApiError(400,"ERROR IN CREATING TOKENS",error)
   }

}
const registerUser=asyncHandler(async(req,res)=>{
    const{userName,password}=req.body
    if(!userName){
        throw new ApiError(400,"UserName not found")
    }
    if(!password){
        throw new ApiError(400,"Password not found")
    }
    const existedUser=await User.findOne({userName});
    if(existedUser){
        throw new ApiError(400,"User already exists")
    }
    const newUser=await User.create({
        userName:userName,password:password
    })
    if(!newUser){
        throw new ApiError(400,"Error in creating user")
    }
    const createdUser=await User.findById(newUser._id).select("-password");
    if(!createdUser){
        throw new ApiError(400,"User not created")
    }
    return res.status(200).json(new ApiResponse(400,createdUser,"User registered successfully"))


});
const logInUser=asyncHandler(async(req,res)=>{
    const{userName,password}=req.body;
    if(!userName){
        throw new ApiError(400,"UserName not found")
    }
    if(!password){
        throw new ApiError(400,"Password is missing")
    }
    const user=await User.findOne({userName});
    if(!user){
        throw new ApiError(400,"User not created")
    }
    const isPassCorr=await user.isPasswordCorrect(password)
    if(!isPassCorr){
        throw new ApiError(400,"Password is not correct")}
    const{accessToken,refreshAccessToken}=await generateTokens(user._id)
    const loggedinuser=await User.findById(user._id).select("-password -refreshAccesstoken")//This is optional so that
const Options={
    httpOnly: true, // Add the HttpOnly flag
    secure: true, // Add the secure flag if applicable
    sameSite: 'Lax',
}
    return res.status(200)
    .header("Access-Control-Allow-Credentials", true)
    .cookie("accessToken",accessToken,Options)
    .cookie("refreshAccessToken",refreshAccessToken,Options)
    .json(new ApiResponse(200,logInUser,"User logged in successfully"))



    
})
const logOutUser=asyncHandler(async(req,res)=>{
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        { new: true }
    );
    const Options = {
        httpOnly: true,
        secure: true,
    };
    return res
        .status(200)
        .clearCookie("accessToken", Options)
        .clearCookie("refreshAccessToken", Options)
        .json(new ApiResponse(200, "User Logged out successfully!!"));
})
export{registerUser,logOutUser,logInUser}