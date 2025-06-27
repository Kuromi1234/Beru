const nodemailer = require("nodemailer");
console.log("Using email:", process.env.EMAIL_USER);
console.log("Using password:", process.env.EMAIL_PASS);


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

const sendEmail = async (to, subject, text) => {
  await transporter.sendMail({
    from: `"Beru Support" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
};

module.exports = sendEmail;
