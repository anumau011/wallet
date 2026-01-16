import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendMail({ to, subject, text, html }) {
  try {
    const msg = {
      to,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL, // VERIFIED sender
        name: "Auth App",
      },
      subject,
      text,
      html,
    };

    const info = await sgMail.send(msg);
    console.log("Email sent",info);
    return info;
  } catch (error) {
    console.error(
      "Email send failed:",
      error.response?.body || error
    );
    throw error;
  }
}
