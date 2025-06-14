import { Schema,model } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    fullname:{
        type:String,
        trim:true,
        lowercase:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    const isUser = await model("User").countDocuments({email:this.email})
    if(isUser)
        throw next(new Error("user already exists"))

    const encryptedPassword = await bcrypt.hash(this.password,12)
    this.password=encryptedPassword

    next()
})

const UserModel=  model("User",userSchema)

export default UserModel