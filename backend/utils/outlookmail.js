const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com", // Outlook SMTP
  port: 587,
  secure: false, // TLS over port 587
  auth: {
    user: process.env.OUTLOOK_USER, 
    pass: process.env.OUTLOOK_PASS, 
  },
});

async function sendEmail(to, subject, html) {
  try {
    const info = await transporter.sendMail({
      from: `"BERU Support" <${process.env.OUTLOOK_USER}>`,
      to, 
      subject,
      html,
    });
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

module.exports = sendEmail;
