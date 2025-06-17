import jwt from "jsonwebtoken"

export const checkRole=(role)=>async(req,res,next)=>{
    try{
        const {accessToken}= req.cookies

        if(!accessToken)
            return res.status(401).json({message:"token not found"})
        const user = jwt.verify(accessToken,process.env.JWT_SECRET)
        console.log("hello")

        if(!user)
            return res.status(500).json({message:"bad request"})
        
        if(role !== user.role)
            throw new Error("invalid bad request")

        next()

    }
    catch(err)
    {
        res.status(500).json({
            message:err.message
        })
    }
}