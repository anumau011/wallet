import nodemailer from "nodemailer";

let transporter;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
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
