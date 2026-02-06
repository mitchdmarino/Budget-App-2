import type {Session} from "../types/session.js";
import { findSessionById } from "../repositories/auth.repo.js";
import { getUserById } from "../repositories/users.repo.js";

export async function verifySessionAndReturnUser(session_id: string) {
    const sessionObj: Session | null = await findSessionById(session_id); 
    if (sessionObj) {
        // check if revoked 
        const revokedAt: Date | null = sessionObj.revoked_at; 
        if (revokedAt) return null; 
        // check if expired 
        const expiresAt: Date = sessionObj.expires_at; 
        const now = new Date(); 
        if (expiresAt < now) {
            return null; 
        } else if (expiresAt < add24Hours(now)) { // check if expires in 24 hours
            await extendSession(session_id); 
        }
        const user = await getUserById(sessionObj.user_id); 
        return user ?? null; 
    }
    return null;  
}

// helper functions 

async function extendSession(session_id: string) {

}

function add24Hours(date: Date) {
  date.setHours(date.getHours() + 24);
  return date;
}