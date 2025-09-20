
import nodemailer from 'nodemailer';
import 'dotenv/config';

// Make sure to set these environment variables in your apphosting.yaml
const host = process.env.SMTP_HOST;
const port = process.env.SMTP_PORT;
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;

if (!host || !port || !user || !pass) {
    console.warn("SMTP configuration is incomplete. Emails will not be sent.");
}

export const transporter = nodemailer.createTransport({
  host: host,
  port: Number(port),
  secure: true, // Port 465 requires a secure connection
  auth: {
    user: user,
    pass: pass,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});
