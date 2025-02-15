import dotenv from 'dotenv';
dotenv.config();

export const MY_ACCESS_TOKEN_SECRET = process.env.MY_ACCESS_TOKEN_SECRET;
export const DB_PORT= process.env.DB_PORT;
export const DB_HOST=  process.env.DB_HOST;
export const DB_NAME= process.env.DB_NAME;
export const DB_USER= process.env.DB_USER;
export const BD_PASSWORD= process.env.BD_PASSWORD;
export const DEFAULT_DB = process.env.DEFAULT_DB;
export const POSTGRESQL_DB_URL = process.env.POSTGRESQL_DB_URL;
