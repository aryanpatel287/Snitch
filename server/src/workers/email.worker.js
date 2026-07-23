import { Redis } from 'ioredis';
import { config } from '../config/config.js';
import { sendEmailDirectly } from '../services/mail/mail.service.js';

export async function startEmailWorker() {
    console.log('[Worker] Background Email Worker started.');
    
    const workerRedis = new Redis({
        host: config.REDIS_HOST,
        port: config.REDIS_PORT,
        password: config.REDIS_PASSWORD,
    });

    workerRedis.on('error', (err) => {
        console.error('[Worker Redis] Connection error:', err);
    });

    while (true) {
        try {
            const job = await workerRedis.blpop('sciolto:email_queue', 0);
            if (job && job.length > 1) {
                const { to, subject, html, text } = JSON.parse(job[1]);
                console.log(`[Worker] Processing email job for ${to}`);
                await sendEmailDirectly({ to, subject, html, text });
                console.log(`[Worker] Email sent successfully to ${to}`);
            }
        } catch (error) {
            console.error('[Worker] Error processing email job:', error);
            await new Promise((resolve) => setTimeout(resolve, 5000));
        }
    }
}
