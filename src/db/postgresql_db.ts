import * as schema from './postgresql_schema'
import { drizzle } from "drizzle-orm/node-postgres";
import {Client} from 'pg'
import { DB_HOST, DB_NAME, DB_USER, BD_PASSWORD, POSTGRESQL_DB_URL } from '../config';

const client =  new Client({
   connectionString: POSTGRESQL_DB_URL!
});

(async function () {
    await client.connect()
})();

///export const db = drizzle( {client:client, mode: "default", schema:{...schema}} );
export const db = drizzle( client,{ schema:{...schema}} );