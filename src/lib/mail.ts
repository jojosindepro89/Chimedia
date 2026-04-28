import nodemailer from "nodemailer";

interface MailOptions {
  to: string;
  subject: string;
  text: string;
}

export async function sendMail({ to, subject, text }: MailOptions) {
  // If SMTP variables are missing, simulate by logging (great for local dev)
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.log("\n-----------------------------------------");
    console.log("      SIMULATED EMAIL SENT (DEV)         ");
    console.log("-----------------------------------------");
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Text: \n${text}`);
    console.log("-----------------------------------------");
    console.log("Note: To send real emails, set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD in .env\n");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_PORT === "465", 
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Admin" <admin@cmhsports.com>',
      to,
      subject,
      text,
    });
    console.log("Message sent via SMTP: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email", error);
  }
}
