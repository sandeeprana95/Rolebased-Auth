import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
mongoose.connect(process.env.DB_URL)

import express from 'express'
import userRouter from './routes/user.routes.js'
import cookieParser from 'cookie-parser'
const app = express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())

app.use("/",userRouter)

app.listen(8080,()=>console.log("server is running on port 8080"))
