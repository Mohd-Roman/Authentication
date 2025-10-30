import User from "../Models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
// import transpoter from "../config/nodemalier.js";


export const register = async (req,res) =>{
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                message:"all feald are required !",
                success:false
            })
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(401).json({
                message:"try different account ",success:false
            })
        }
        const hashPassword = await bcrypt.hash(password,10)

        const user = new User({
            name,
            email,
            password:hashPassword
        })

        await user.save();

        const token = jwt.sign({id:user._id},process.env.JWT_SECRAT,{expiresIn:'7d'})

        res.cookie('token',token, {
            httpOnly:true, secure:process.env.NODE_ENV === 'production',sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7*24*60*60*1000
        })
// // sending welcome email
//         const mailOptions={
//             from: process.env.SENDER_EMAIL,
//             to: email, 
//             subject: `welcome the ${name}`,
//             text:`welcome to my auth website , your account has been created with email id:${email}`
//         }

//         await transpoter.sendMail(mailOptions);
// //welcome
        return res.json({
            message:"user register",
            success:true
        })

    } catch (error) {
        console.log(error ,'something error in register ')
    }
}

export const login = async (req,res) =>{
    try {
        const {email,password} =req.body;
        //check 
         if(!email || !password){
            return res.status(400).json({
                message:"all feald are required !",
                success:false
            })
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                message:"user not found ",
                success:false
            })
        }
        const isMatch = bcrypt.compare(password,user.password)
        if(!isMatch){
            res.json({
                message:"rong password",
                success:false
            })
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRAT,{expiresIn:'7d'})
        res.cookie('token',token, {
            httpOnly:true, secure:process.env.NODE_ENV === 'production',sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7*24*60*60*1000
        })

        return res.json({
            message:"user login",
            success:true
        })
    } catch (error) {
        console.log(`something error in login `,error )
    }
}

export const logout = async (req,res) =>{
    try {
        res.clearCookie('token',{httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7*24*60*60*1000})

        return res.json({success:true, message:"Logout user"})
    } catch (error) {
        console.log(`something error in login `)
    }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude password
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};