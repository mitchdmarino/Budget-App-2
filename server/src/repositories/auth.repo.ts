import { pool } from "../db/pool.js"; 

export async function createSession(user_id: string) {
     const result = await pool.query(
        `
        INSERT INTO users (user_id)
        VALUES ($1)
        RETURNING id, user_id, created_at, expires_at, revoked_at
        `, 
        [user_id]
    ); 
    return result.rows[0]; 
}

export async function findSessionById(session_id: string) {
    const result = await pool.query(
        `
        SELECT id, user_id, expires_at, revoked_at
        FROM sessions
        WHERE id = $1
        `, 
        [session_id]
    ); 
    return result.rows[0] ?? null; 
}

export async function extendSessionById(session_id: string) {
    const result = await pool.query(
        `
        UPDATE sessions
        SET expires_at = NOW() + interval '14 days'
        WHERE id = $1
        `, 
        [session_id]
    ); 
    return null; 
}

export async function revokeSession(session_id: string) {
    const result = await pool.query(
        `
        UPDATE sessions
        SET revoked_at = NOW()
        WHERE id = $1
        `, 
        [session_id]
    ); 
    return null; 
}

export async function revokeAllSessionsForUser(user_id: string) {
    const result = await pool.query(
        `
        UPDATE sessions
        SET revoked_at = NOW()
        WHERE user_id = $1
        `, 
        [user_id]
    ); 
    return null; 
}