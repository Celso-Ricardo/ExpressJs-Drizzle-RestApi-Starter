import  { defineConfig  } from "drizzle-kit";
import { DEFAULT_DB, POSTGRESQL_DB_URL } from "./src/config";
export default defineConfig ({
    schema:"./src/db/"+DEFAULT_DB+"_schema.ts",
    out: "./drizzle_"+ DEFAULT_DB,
    dialect: DEFAULT_DB == "mysql" ? "mysql":"postgresql",
    verbose:true,
    dbCredentials:  DEFAULT_DB == "mysql" ? {
        host:"localhost",
        user:"root",
        port: 5432,
        database:"drizzle",
        password:""
    } : {
        url : POSTGRESQL_DB_URL!,
    },
    migrations: {
        prefix: "timestamp",
        table: "__drizzle_migrations__",
        schema: "public",
    },
});

