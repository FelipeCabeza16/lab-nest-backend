import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  database: {
    name: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT,
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  },
  postgres: {
    name: process.env.POSTGRES_DB,
    port: parseInt(process.env.POSTGRES_PORT || '5433', 10),
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  },
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
}));
