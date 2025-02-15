import {migrate} from "drizzle-orm/mysql2/migrator"
import { drizzle } from "drizzle-orm/mysql2"
import mysql from "mysql2/promise"
import path from "path"
import { DB_HOST, DB_NAME, DB_USER, BD_PASSWORD, DEFAULT_DB } from '../config';

export const dbMigrate = async () => {
    try{
        const dbConnection = await mysql.createConnection({
            host:DB_HOST,
            user:DB_USER,
            database:DB_NAME,
            password:BD_PASSWORD
        });

        const dbMigrator = drizzle(dbConnection);

        await migrate(dbMigrator, {
            //path.resolve("param") the folder where the migration files are stored in
            migrationsFolder: path.resolve("drizzle_"+DEFAULT_DB)
        });
        
        console.log("migration done");

        process.exit(0);
    }catch(e){
        console.log("migration error: ", e);
        process.exit(0);
    }
};
dbMigrate();