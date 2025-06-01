import {User} from "../models/auth.model.js"
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"

export const signUp = async(req,res)=>{
    const {name,email,password,role}= req.body;
    console.log(name,email,password,role);
// Validation
    if(!name||!email||!password){ 
        return res.status(403).json({
            success:false,
            message:"All fields are required"
        })
    }

    try{
// user exist
   

    const user = await User.findOne({email})
    if(user){
        return res.status(403).json({
            success:false,
            message:"User Already Exist"
        })

    }
// bcrypt haspassword
   const hashPassord = await bcrypt.hash(password,10)
// Save Details
    await User.create({
        name,email,password:hashPassord,role
    })

    return res.status(200).json({
        success:true,
        message:"Successfully Signup"
    })
}catch(error){
    console.log("Error in Signup Function",error)
    return res.status(500).json({
        success:false,
        message:"Internal Server Error",
        error:error.message
    })
}
    
}

// login funtion

export const login = async(req,res)=>{
     const {email,password}= req.body;
     
    //  validation
    if(!email||!password){
        return res.status(403).json({
            success:false,
            message:"All fields are required"
        })
    }
    try {
        // use not found
        const user = await User.findOne({email})
        if(!user){
            return res.status(403).json({
                success:false,
                message:"user Not Found"
            })
        }

        const matchPass = await bcrypt.compare(password, user.password)
        if(!matchPass){
            return res.status(403).json({
                success:false,
                message:"Invalid Credentials"
            })
        }

        const token = await JWT.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:"1d"})
        return res.status(200).cookie("token",token,{httpOnly:true,sameSite:"strict",maxAge:24*60*60*1000}).json({
            success:true,
            message:"Successfully Login",
            token:token
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Invalid Login Error",
            error:error.message
        })
    }
}


// Logout

export const logout = async(req,res)=>{
    try{
         return res.status(200).cookie("token","",{maxAge:0}).json({
            success:true,
            message:"Successfuly logout"
         })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Invalid Server Error",
            error:error.message
        })
    }
}