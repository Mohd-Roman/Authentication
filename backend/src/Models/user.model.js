import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},

    //for Verify 
    verifyOtp:{type:String,default:''},
    verifyOtpExpireAt:{type:Number,default:0},
    isAccountVerified:{type:Boolean,default:false},

    //reset OPT
    resetOtp:{type:String,default:""},
    resetOtpExpireAt:{type:String,default:""},
},{})

const User = mongoose.models.user || mongoose.model('User',userSchema)
export default User