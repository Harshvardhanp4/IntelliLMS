import express from 'express'
import { login, logOut, ResetPassword, sendOTP, signUp, verifyOTP } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post("/signup", signUp)
authRouter.post("/login", login)
authRouter.get("/logout", logOut) 
authRouter.post("/sendotp", sendOTP)
authRouter.post("/verifyotp", verifyOTP)
authRouter.post("/resetpassword",ResetPassword)

export default authRouter;