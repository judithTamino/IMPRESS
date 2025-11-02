import mongoose from 'mongoose';
import chalk from 'chalk';
import { MONGODB_URI } from './env.js';

const connectToDB = async () => {
  try {
    await mongoose.connect(`${MONGODB_URI}/IMPRESS`);
    console.log(chalk.bgGreenBright('MongoDB connected successfully'));   
  } catch (error) {
    console.log(chalk.bgRedBright("MongoDB connection error: ", error));
    process.exit(1);
  }
};

export default connectToDB;