import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config();


const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

 const sendMail = async (to, otp)=>{
    await transporter.sendMail({
    from: process.env.USER_EMAIL,
    to: to,
    subject: "Reset your password",
    html: `<p>Your OTP for Password Reset is <b>${otp} It will expire in 5 minutes</b></p>`
  });
 }

 export default sendMail;