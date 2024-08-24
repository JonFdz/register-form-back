import dotenv from 'dotenv';

dotenv.config();

const env = {
	PORT: process.env.PORT,
	DBURL: process.env.DB_URL,
};

export default env;
