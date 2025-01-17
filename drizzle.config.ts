import  { defineConfig  } from "drizzle-kit";
export default defineConfig ({
    schema:"./src/db/schema.ts",
    out: "./drizzle",
    dialect: 'mysql',
    verbose:true,
    dbCredentials: {
        host:"localhost",
        user:"root",
        port: 5432,
        database:"drizzle",
        password:""
    },
    migrations: {
        prefix: "timestamp",
        table: "__drizzle_migrations__",
        schema: "public",
    },
});