const baseStyles = `font-family: 'Inter', Helvetica, Arial, sans-serif; background-color: #f9f9f9; padding: 20px; color: #1a1a1a; margin: 0;`;
const cardStyles = `max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;`;
const headerStyles = `background-color: #000000; color: #ffffff; padding: 30px; text-align: center;`;
const titleStyles = `margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;`;
const textStyles = `font-size: 16px; line-height: 1.6; margin-bottom: 24px; color: #333333;`;
const buttonStyles = `display: inline-block; padding: 14px 32px; background-color: #000000; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; letter-spacing: 0.5px;`;
const linkFallbackStyles = `font-size: 13px; color: #555555; margin-top: 20px; word-break: break-all; line-height: 1.5;`;
const footerStyles = `padding: 20px; text-align: center; font-size: 12px; color: #888888; border-top: 1px solid #e0e0e0; background-color: #fafafa;`;

const emailStyles = `
  body { ${baseStyles} }
  .container { ${cardStyles} }
  .header { ${headerStyles} }
  .header h1 { ${titleStyles} }
  .content { padding: 40px 30px; text-align: left; }
  .content p { ${textStyles} }
  .btn-wrapper { text-align: center; margin: 40px 0; }
  .btn { ${buttonStyles} }
  .link-fallback { ${linkFallbackStyles} }
  .footer { ${footerStyles} }
  .note { font-size: 14px; color: #666666; margin-top: 30px; }
`;

export const emailVerificationTemplate = ({ name, verificationUrl }) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email</title>
      <style>
        ${emailStyles}
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>SNITCH</h1>
        </div>
        <div class="content">
          <p>Hi ${name},</p>
          <p>Welcome to Snitch! We're thrilled to have you on board. Please verify your email address to unlock full access to your account and complete your registration.</p>
          <div class="btn-wrapper">
            <a href="${verificationUrl}" class="btn">Verify Email Address</a>
          </div>
          <p class="link-fallback">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${verificationUrl}" style="color: #000000;">${verificationUrl}</a>
          </p>
          <p class="note">If you didn't create an account with Snitch, you can safely ignore this email.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Snitch. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const resetPasswordEmailTemplate = ({ name, resetUrl }) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password</title>
      <style>
        ${emailStyles}
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>SNITCH</h1>
        </div>
        <div class="content">
          <p>Hi ${name},</p>
          <p>We received a request to reset the password for your Snitch account. If you made this request, please click the button below to securely set a new password.</p>
          <div class="btn-wrapper">
            <a href="${resetUrl}" class="btn">Reset Password</a>
          </div>
          <p class="link-fallback">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${resetUrl}" style="color: #000000;">${resetUrl}</a>
          </p>
          <p class="note">If you didn't request a password reset, you can safely ignore this email. Your password will remain completely secure and unchanged.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Snitch. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
