import app from './src/app.js';
import { config } from './src/config/config.js';
import connectToDb from './src/config/database.js';

const SERVER_PORT = config.SERVER_PORT || 3000;

connectToDb();

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
});
