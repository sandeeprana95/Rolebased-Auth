import { Router } from "express";
import { login, signup } from "../controller/user.controller.js";

const userRouter = new Router()

userRouter.post("/signup",signup)
userRouter.post("/login",login)

export default userRouter

