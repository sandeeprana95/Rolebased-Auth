import UserModel from "../model/user.model.js"

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