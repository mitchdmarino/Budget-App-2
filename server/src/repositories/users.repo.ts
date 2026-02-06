import { pool } from "../db/pool.js"; 

export async function createUser(email: string, name: string) {
    const result = await pool.query(
        `
        INSERT INTO users (email, name)
        VALUES ($1, $2)
        RETURNING id, email, name, created_at, updated_at
        `, 
        [email, name]
    ); 
    return result.rows[0]; 
}

export async function getUserById(id: string) {
    const result = await pool.query(
        `
        SELECT id, email, name, created_at, updated_at
        FROM users
        WHERE id = $1
        `, 
        [id]
    ); 
    return result.rows[0] ?? null; 
}

export async function getUserByEmail(email: string) {
    const result = await pool.query(
        `
        SELECT id, email, name, created_at, updated_at
        FROM users
        WHERE email = $1
        `, 
        [email]
    ); 
}


