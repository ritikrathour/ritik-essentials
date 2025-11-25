import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { config } from "../config";
// Email transporter setup
const mailOptions: SMTPTransport.Options = {
  host: config.emailHost,
  port: Number(config.emailPort),
  secure: false,
  auth: {
    user: config.emailFrom,
    pass: config.emailpass,
  },
};
const Transporter = nodemailer.createTransport(mailOptions);

const SendEmail = async (to: string, subject: string, html: string) => {
  try {
    await Transporter.sendMail({
      from: config.emailFrom,
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
