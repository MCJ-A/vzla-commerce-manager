
import dotenv from 'dotenv';
dotenv.config();

import { Client } from 'pg';

async function main() {
    console.log('Testing raw pg connection with SSL...');
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        connectionTimeoutMillis: 10000,
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();
        console.log('Connected successfully!');
        const res = await client.query('SELECT NOW()');
        console.log('Query result:', res.rows[0]);
        await client.end();
    } catch (err) {
        console.error('Connection error:', err);
    }
}

main();
