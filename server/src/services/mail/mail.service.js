import { config } from '../../config/config.js';
import { sendEmailUsingGmailAPI } from './gmail.mail.service.js';
import { sendEmailUsingResend } from './resend.mail.service.js';

export async function sendEmail({ to, subject, html, text }) {
    try {
        if (config.NODE_ENV == 'DEVELOPMENT') {
            const emailResponse = await sendEmailUsingGmailAPI({
                to,
                subject,
                html,
                text,
            });

            return emailResponse.message;
        }

        const emailResponse = await sendEmailUsingResend({
            to,
            subject,
            html,
            text,
        });

        return emailResponse.message;
    } catch (error) {
        console.error('Error sending email : ', error);
        throw error;
    }
}
