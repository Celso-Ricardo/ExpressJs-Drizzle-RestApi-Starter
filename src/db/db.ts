import * as schema from './schema'
import { drizzle } from "drizzle-orm/mysql2";
import mysql2 from 'mysql2/promise'
import { DB_HOST, DB_NAME, DB_USER, BD_PASSWORD } from '../config';

const poolConnection =  mysql2.createPool({
    host:DB_HOST,
    user:DB_USER,
    database:DB_NAME,
    password:BD_PASSWORD
});

export const db = drizzle( {client:poolConnection, mode: "default", schema:{...schema}} );
