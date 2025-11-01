import User from "../models/userModel.js"
import validator from "validator"
import bcrypt from "bcryptjs"
import getToken from "../config/token.js"
import sendMail from "../config/sendMail.js"
import crypto from "crypto"


//-------------------signup controller------------------

export const signUp = async (req, res) => {
    try {
        //
        const { name, email, password, role } = req.body
        const userRole = role || "student"
        let existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists!"
            })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: "Enter valid email"
            })
        }
        if (password.length < 6) {
            return res.status(400).json({
                message: "Enter strong password"
            })
        }

        //hash pass section
        let hashPassword = await bcrypt.hash(password, 10)

        //create user section

        const user = await User.create({
            name,
            email,
            password: hashPassword,
            role: userRole
        })

        //token generate

        let token = await getToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(201).json(user)

    } catch (error) {
        return res.status(500).json({
            message: `SignUp error ${error}`
        })
    }
}

//-------------------login controller------------------//

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        let user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        let isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }
        let token = await getToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({
            message: `Login error ${error}`
        })
    }
}

//--- Logout controller ----

export const logOut = async (req, res) => {
    try {
        await res.clearCookie("token")
        return res.status(200).json({
            message: "Logged Out Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: `Logout error ${error}`
        })
    }
}

//----------------setOtp Controller---------------//

export const sendOTP = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        user.resetOtp = otp,
            user.otpExpires = Date.now() + 5 * 60 * 1000 //1000 ms
        user.isOtpVerified = false

        await user.save()
        await sendMail(email, otp)
        res.status(200).json({
            msg: "Otp sent successfully"
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Error while sending OTP"
        })
    }
}


//----------------Verify OTP------------------------//


export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body
        const user = await User.findOne({ email })
        if (!user || user.resetOtp != otp || user.otpExpires < Date.now()) {
            return res.status(404).json({
                message: "Invalid OTP"
            })
        }
        user.isOtpVerified = true
        user.resetOtp = undefined,
            user.otpExpires = undefined

        await user.save();

        res.status(200).json({
            msg: "Otp Verified successfully"
        })

    }
    catch {
        return res.status(500).json({
            msg: "Error while verifiying OTP"
        })
    }
}


//-------------------------ResetPassword----------------//

export const ResetPassword = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user || !user.isOtpVerified) {
            return res.status(404).json({
                message: "OTP Verification is required"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        user.password = hashPassword,
            user.isOtpVerified = false,

            await user.save()

        res.status(200).json({
            msg: "Reset Password successfully"
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Error while password reset"
        })
    }
}

//--------------Google Signup--------------//

export const googleAuth = async (req, res) => {
    try {
        const { name, email, role } = req.body
        let user = await User.findOne({ email })
        if (!user) {

            const randomPassword = crypto.randomBytes(16).toString("hex");
            const hashedPassword = await bcrypt.hash(randomPassword, 10);

            user = await User.create({
                name,
                email,
                role: role || "student",
                password: hashedPassword
            })
        }
        let token = await getToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(201).json(user)

    } catch (error) {
        return res.status(500).json({
            msg: "Google Auth Error"
        })
    }
}