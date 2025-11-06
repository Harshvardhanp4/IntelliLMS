import { Resend } from 'resend';
import dotenv from "dotenv"
dotenv.config();


const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async (to, otp) => {
  try {
    const result = await resend.emails.send({
      from: 'IntelliLMS <onboarding@resend.dev>', // Resend default sender
      to: [to],
      subject: "Reset your password",
      html: `<p>Your OTP for Password Reset is <b>${otp}</b>. It will expire in 5 minutes</p>`
    });

    console.log('Email sent via Resend:', result);
    return result;
  } catch (error) {
    console.log('Resend error:', error);
    throw error;
  }
}

export default sendMail;