import dotenv from "dotenv";
import { createTransport } from "nodemailer";
import sanitize from "sanitize-html";

dotenv.config();

// Load environment variables
const { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASS, TO_EMAIL } = process.env;

if (!EMAIL_SERVICE || !EMAIL_USER || !EMAIL_PASS || !TO_EMAIL) {
  console.error("❌ Missing required environment variables for email configuration");
}

// Create Nodemailer transporter
const transporter = createTransport({
  service: EMAIL_SERVICE,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export default async function handler(req, res) {
  // ✅ Debugging - Log Incoming Requests
  console.log("📩 Incoming request:", req.method, req.headers, req.body);

  // ✅ Handle CORS Preflight Request
  const allowedOrigins = ["https://www.codesquare.io", "https://codesquare.io, https://codesquare-bkend.vercel.app"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.setHeader("Content-Type", "application/json");
    return res.status(200).end(); // Allow CORS preflight
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // ✅ Ensure JSON Parsing
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Request body is missing" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required" });
  }

  const mailOptions = {
    from: `"CODESQUARE Contact Form" <${EMAIL_USER}>`,
    replyTo: email,
    to: TO_EMAIL,
    subject: `[ACTION REQUIRED] New contact from ${name}`,
    text: `New message from ${name} (${email}):\n\n${message}\n\nReply to: ${email}\nReceived: ${new Date().toUTCString()}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #E5E7EB;">
        <h2 style="color: #4F46E5;">New Contact Form Submission</h2>
        <table>
          <tr><td><strong>Name:</strong></td><td>${sanitize(name)}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${sanitize(email)}</td></tr>
          <tr><td><strong>Time:</strong></td><td>${new Date().toLocaleString()}</td></tr>
        </table>
        <div style="background: #F9FAFB; padding: 15px; margin-top: 20px;">
          <h4 style="margin-top: 0;">Message:</h4>
          <p style="white-space: pre-line;">${sanitize(message).replace(/\n/g, "<br>")}</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
