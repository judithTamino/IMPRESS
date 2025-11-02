import { config } from 'dotenv';

config({ path: '.env', quiet: true });
export const { PORT, MONGODB_URI, ADMIN_EMAIL, JWT_SECRET } = process.env;