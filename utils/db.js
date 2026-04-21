import dotenv from "dotenv"
import pg from "pg"

dotenv.config({ path: "./utils/.env" })

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false,
    },
};

export async function db_connect(){
    const client = new pg.Client(config);
    await client.connect();
    return client;
}