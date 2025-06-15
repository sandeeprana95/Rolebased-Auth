import UserModel from "../model/user.model.js"
import bcrypt from "bcrypt"

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

        res.json({message:"user login successful"})

    }
    catch(err)
    {
        res.status(500).json({
            message:err.message
        })
    }
}