import { pool } from "../db/pool.js"; 

export async function createAccount(userId: string, name: string) {
    const result = await pool.query(
        `
        INSERT INTO accounts (userId, name)
        VALUES ($1, $2)
        RETURNING id, name, created_at, updated_at
        `, 
        [userId, name]
    ); 
    return result.rows[0]; 
}