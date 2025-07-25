import dotenv from 'dotenv';

dotenv.config();

export const ENV_VARS = {
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
     MONGO_URI : process.env.MONGO_URI,
}