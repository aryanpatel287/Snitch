import { config } from '../../config/config.js';
import { sendEmailUsingGmailAPI } from './gmail.mail.service.js';
import { sendEmailUsingResend } from './resend.mail.service.js';
import redis from '../../config/cache.js';

export async function sendEmailDirectly({ to, subject, html, text }) {
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

export async function sendEmail({ to, subject, html, text }) {
    try {
        if (
            (config.NODE_ENV == 'testing' || config.NODE_ENV == 'test') ||
            (to && (to.includes('loadtest') || to.endsWith('@example.com')))
        ) {
            console.log(`[TESTING] Skipping email to ${to} (Subject: ${subject})`);
            return true;
        }

        const payload = JSON.stringify({ to, subject, html, text });
        await redis.rpush('sciolto:email_queue', payload);
        console.log(`[Queue] Email job enqueued for ${to}`);
        return true;
    } catch (error) {
        console.error('[Queue] Error enqueuing email, falling back to direct send:', error);
        return await sendEmailDirectly({ to, subject, html, text });
    }
}
