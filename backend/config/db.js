import mongoose from 'mongoose';
import chalk from 'chalk';
import { MONGODB_URI, ATLASDB_URI, ENV } from './env.js';

const connectToDB = async () => {
  try {
    if (ENV === 'development')
      await mongoose.connect(`${MONGODB_URI}/IMPRESS`);
    if (ENV === 'production')
      await mongoose.connect(`${ATLASDB_URI}/IMPRESS`);
    console.log(chalk.bgGreenBright(`DB connected successfully on ${ENV} mode`));
  } catch (error) {
    console.log(chalk.bgRedBright("DB connection error: ", error.message));
    process.exit(1);
  }
};

export default connectToDB;