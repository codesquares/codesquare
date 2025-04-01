import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { createTransport } from 'nodemailer';
import sanitize from 'sanitize-html';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(json());

// Load environment variables
const { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASS, TO_EMAIL } = process.env;

// Validate required environment variables
if (!EMAIL_SERVICE || !EMAIL_USER || !EMAIL_PASS || !TO_EMAIL) {
  console.error('Missing required environment variables for email configuration');
  process.exit(1);
}

// Create Nodemailer transporter
const transporter = createTransport({
  service: EMAIL_SERVICE,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
});

// Test email configuration on server start
transporter.verify((error) => {
  if (error) {
    console.error('Error with email configuration:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Email endpoint (for Vercel)
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    // Email options
    const mailOptions = {
      from: `"CODESQUARE Contact Form" <${EMAIL_USER}>`,
      replyTo: email,
      to: TO_EMAIL,
      subject: `[ACTION REQUIRED] New contact from ${name}`,
      text: `
        New message from ${name} (${email}):
        ============================
        ${message}
        
        Reply to: ${email}
        Received: ${new Date().toUTCString()}
      `,
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
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Export the app for Vercel's serverless functions
export default app;
