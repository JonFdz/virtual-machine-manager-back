import dotenv from 'dotenv';

dotenv.config();

const env = {
	port: process.env.PORT,
	dbUrl: process.env.DB_URL,
};

export default env;
