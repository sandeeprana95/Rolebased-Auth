import { Router } from "express";
import { login, signup } from "../controller/user.controller.js";
import { checkRole } from "../middleware/user.middleware.js";

const userRouter = new Router()

userRouter.post("/signup",signup)
userRouter.post("/login",login)
userRouter.post("/user",checkRole("user"),(req,res)=>{
    res.json({message:"hello user"})
})
userRouter.post("/admin",checkRole("admin"),(req,res)=>{
    res.json({message:"hello admin"})
})

export default userRouter

