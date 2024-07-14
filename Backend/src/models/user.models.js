import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from"jsonwebtoken";
const userSchema= new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,

    },password:{
        type:String,
        required:true,
    },accessToken:{
        type:String,
    },refreshAccessToken:{
        type:String,
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next();
    this.password=await bcrypt.hash(this.password,10);
    next();
})
userSchema.methods.generateAccessToken=function(){
    return jwt.sign({_id:this._id,userName:this.userName},process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY

    })
    
}
userSchema.methods.isPasswordCorrect=async function(password){
    return bcrypt.compare(password,this.password)
}
userSchema.methods.generateRefreshAccessToken=function(){
    return jwt.sign({_id:this._id},process.env.REFRESH_ACCESS_TOKEN_SECRET,{expiresIn:process.env.REFRESH_ACCESS_TOKEN_EXPIRY
        
    })
    
}
export const User=mongoose.model("User",userSchema)