import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
// Email transporter setup
const mailOptions: SMTPTransport.Options = {
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_Pass,
  },
};
const Transporter = nodemailer.createTransport(mailOptions);

const SendEmail = async (to: string, subject: string, html: string) => {
  try {
    await Transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });
    return true;
  } catch (error) {
    console.error("Email send error:", error);
    return false;
  }
};
export { Transporter, SendEmail };
