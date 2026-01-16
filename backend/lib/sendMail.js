import nodemailer from "nodemailer";

let transporter;

function getTransporter() {
  if (!transporter) {
    const port = Number(process.env.EMAIL_PORT) || 587; // Default to 587 if missing

    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: port,
      // Use "true" for 465, "false" for all other ports
      secure: port === 465, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // specific timeout settings to avoid hanging
      connectionTimeout: 10000, 
    });
  }
  return transporter;
}
export async function sendMail({ to, subject, text, html }) {
  try {
    const transporter = getTransporter();

    const info = await transporter.sendMail({
      from: `"Auth App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
    return info;
  } catch (error) {
    console.error("Email send failed:", error);
    throw error;
  }
}
