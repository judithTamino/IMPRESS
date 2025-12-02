import { config } from 'dotenv';

config({ path: '.env', quiet: true });
export const { PORT, MONGODB_URI, ATLASDB_URI, ADMIN_EMAIL, JWT_SECRET, ENV, SMTP_USER, SMTP_PASSWORD, SENDER_EMAIL } = process.env;