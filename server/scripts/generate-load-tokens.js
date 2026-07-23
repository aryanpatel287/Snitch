import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import connectToDb from '../src/config/database.js';
import { config } from '../src/config/config.js';
import userModel from '../src/models/user.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serverRoot = path.resolve(__dirname, '..');
const testsDir = path.join(serverRoot, 'tests');

async function generateTokens() {
    try {
        console.log('Connecting to database...');
        await connectToDb();

        const testingUsers = [];
        
        // Seed or retrieve 20 unique testing customer accounts
        for (let i = 0; i < 20; i++) {
            const email = `loadtest_customer${i}@example.com`;
            let user = await userModel.findOne({ email });
            
            if (!user) {
                console.log(`Seeding customer: ${email}`);
                user = await userModel.create({
                    email,
                    fullname: `LoadTest Customer ${i}`,
                    contact: `+100000000${i}`,
                    password: 'loadtest_pass_123',
                    role: 'buyer'
                });
            }
            testingUsers.push(user);
        }

        console.log('Generating 200 pre-signed JWT tokens...');
        const tokens = [];
        for (let i = 0; i < 200; i++) {
            const user = testingUsers[i % testingUsers.length];
            const token = jwt.sign(
                {
                    _id: user._id,
                    role: user.role,
                },
                config.JWT_SECRET,
                { expiresIn: '7d' }
            );
            tokens.push(token);
        }

        // Ensure tests directory exists
        if (!fs.existsSync(testsDir)) {
            fs.mkdirSync(testsDir, { recursive: true });
        }

        // Write CSV
        const csvPath = path.join(testsDir, 'load-tokens.csv');
        const csvContent = ['token', ...tokens].join('\n');
        fs.writeFileSync(csvPath, csvContent, 'utf-8');
        console.log(`Successfully wrote 200 tokens to ${csvPath}`);

        // Write credentials CSV
        const credsCsvPath = path.join(testsDir, 'load-credentials.csv');
        const credsCsvHeader = 'email,password';
        const credsRows = testingUsers.map(user => `${user.email},loadtest_pass_123`);
        const credsCsvContent = [credsCsvHeader, ...credsRows].join('\n');
        fs.writeFileSync(credsCsvPath, credsCsvContent, 'utf-8');
        console.log(`Successfully wrote ${testingUsers.length} credentials to ${credsCsvPath}`);

    } catch (error) {
        console.error('Error during token generation:', error);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('Database disconnected gracefully.');
    }
}

generateTokens();
