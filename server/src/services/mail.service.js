import nodemailer from 'nodemailer';
import { config } from '../config/config.js';

const trasporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: config.GOOGLE_USER,
    clientId: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    refreshToken: config.GOOGLE_REFRESH_TOKEN,
  },
});


trasporter
  .verify()
  .then(() => {
    console.log('Email service is ready to send emails');
  })
  .catch((err) => {
    console.error('Error setting up email service', err);
  });

export async function sendEmail({ to, subject, html, text }) {
  const mailOptions = {
    from: config.GOOGLE_USER,
    to,
    subject,
    html,
    text,
  };

  try {
    const detail = await trasporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email', error);
  } finally {
    return;
  }
}
