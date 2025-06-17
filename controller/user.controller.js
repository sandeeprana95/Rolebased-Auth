import UserModel from "../model/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const signup=async(req,res)=>{
    try{
        const newUser = new UserModel(req.body)
        await newUser.save()
        res.json({
            message:"Signup Success"
        })

    }
    catch(err)
    {
        console.log(err.message)
        res.status(500).json({
            message:err.message
        })
    }
}

export const login=async(req,res)=>{
    try{
        const {email,password}=req.body
        const user = await UserModel.findOne({email})
        if(!user)
            return res.status(404).json({message:"user not found"})

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch)
             return res.status(401).json({message:"password doesn't match"})   
            
        const payload={
            id:user._id,
            fullname:user.fullname,
            email:user.email,
            role:user.role
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1d"})

        res.cookie("accessToken",token,{
          maxAge:24*60*60*1000,
          httpOnly:true
        })

        res.json({message:"user login successful",token})

    }
    catch(err)
    {
        res.status(500).json({
            message:err.message
        })
    }
}