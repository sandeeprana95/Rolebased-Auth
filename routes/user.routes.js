import { Router } from "express";
import { signup } from "../controller/user.controller.js";

const userRouter = new Router()

userRouter.post("/signup",signup)

export default userRouter

