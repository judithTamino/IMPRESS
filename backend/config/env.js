import { config } from 'dotenv';

config({ path: '.env', quiet: true });
export const { PORT, MONGODB_URI, ATLASDB_URI, ADMIN_EMAIL, JWT_SECRET, ENV, SMTP_USER, SMTP_PASSWORD, SENDER_EMAIL, CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET, STRIPE_SECRET_KEY, FRONTEND_URL} = process.env;