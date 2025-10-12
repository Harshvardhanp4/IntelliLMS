import User from "../models/userModel.js"
import validator from "validator"
import bcrypt from "bcryptjs"
import getToken from "../config/token.js"


//-------------------signup controller------------------

export const signUp = async(req,res)=>{
    try{
        //
        const {name, email, password, role} = req.body
        let existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                message: "User already exists!"
            })
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({
                message: "Enter valid email"
            })
        }
        if(password.length <6){
            return res.status(400).json({
                message: "Enter strong password"
            })
        }

        //hash pass section
        let hashPassword = await bcrypt.hash(password,10)

        //create user section

        const user = await User.create({
            name,
            email,
            password: hashPassword,
            role
        })

        //token generate

        let token = await getToken(user._id)
        req.cookie("token", token,{
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(201).json(user)

    }catch(error){
        return res.status(500).json({
            message:`SignUp error ${error}`
        })
    }
}

//-------------------login controller------------------//

export const login = async(req,res) =>{
    try{
        const {email, password} = req.body
        
        let user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }
        let isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }
         let token = await getToken(user._id)
        req.cookie("token", token,{
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json(user)

    }catch(error){
        return res.status(500).json({
            message:`Login error ${error}`
        })
    }
}

//--- Logout controller ----

export const logOut = async (req,res)=>{
    try{
        await res.clearCookie("token")
        return res.status(200).json({
            message: "Logged Out Successfully"
        })
    }catch(error){
        return res.status(500).json({
            message:`Logout error ${error}`
        })
    }
}