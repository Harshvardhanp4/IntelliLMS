import pkg from 'nodemailer';
const { createTransporter } = pkg;
import dotenv from "dotenv"
dotenv.config();

const transporter = createTransporter({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 60000,
  socketTimeout: 60000
});

const sendMail = async (to, otp) => {
  try {
    const result = await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: to,
      subject: "Reset your password",
      html: `<p>Your OTP for Password Reset is <b>${otp}</b>. It will expire in 5 minutes</p>`
    });
    console.log('Email sent via Gmail:', result.messageId);
    return result;
  } catch (error) {
    console.log('Gmail error:', error);
    throw error;
  }
}

export default sendMail;