import { pool } from "../db/pool.js"; 

export async function registerUser(email: string, password: string) {

}
export async function loginUser(email: string, password: string) {

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

export async function updateSessionById(session_id: string, dateExpires: Date) {

}

export async function logoutUser(user_id: string) {

}