export const getVerifyOtpEmailHtml = ({ name, otp }) => {
  return `
  <div style="
    max-width: 480px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 12px;
    padding: 28px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
    color: #1f2937;
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  ">

    <h2 style="margin-top: 0; color: #111827;">
      Verify your email
    </h2>

    <p style="font-size: 15px; line-height: 1.6;">
      Hi <strong>${name}</strong>,
    </p>

    <p style="font-size: 15px; line-height: 1.6;">
      Use the following One-Time Password (OTP) to verify your email address:
    </p>

    <div style="
      margin: 24px 0;
      text-align: center;
    ">
      <span style="
        display: inline-block;
        letter-spacing: 6px;
        font-size: 28px;
        font-weight: 700;
        background: #f3f4f6;
        padding: 14px 24px;
        border-radius: 10px;
        color: #111827;
      ">
        ${otp}
      </span>
    </div>

    <p style="font-size: 14px; color: #6b7280; line-height: 1.6;">
      This OTP is valid for <strong>5 minutes</strong>.  
      Please do not share it with anyone.
    </p>

    <p style="font-size: 14px; color: #6b7280; line-height: 1.6;">
      If you didn’t request this, you can safely ignore this email.
    </p>

    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />

    <p style="font-size: 12px; color: #9ca3af; text-align: center;">
      © ${new Date().getFullYear()} Your App. All rights reserved.
    </p>

  </div>
  `;
};
