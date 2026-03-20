import type { Session } from "../types/session.js";
import { extendSessionById, findSessionById, insertSession, revokeSession } from "../repositories/auth.repo.js";
import { getUserById } from "../repositories/users.repo.js";
import { findUserByEmail, isValidPassword } from "./user.services.js";

export async function verifySessionAndReturnUser(session_id: string) {
    const sessionObj: Session | null = await findSessionById(session_id);
    if (!sessionObj) return null;
    let sessionExtended: boolean = false;
    // check if revoked 
    const revokedAt: Date | null = sessionObj.revoked_at;
    if (revokedAt) return null;
    // check if expired 
    const expiresAt: Date = sessionObj.expires_at;
    const now = new Date();
    if (expiresAt < now) {
        return null;
    } else if (expiresAt < add24Hours(now)) { // check if expires in 24 hours or less
        sessionExtended = true;
        await extendSession(session_id);
    }
    const user = await getUserById(sessionObj.user_id);
    if (!user) {
        return null;
    }
    return {
        user_id: user.id,
        sessionExtended: sessionExtended
    }
}

export async function createSession(user_id: string) {
    if (!user_id) {
        return null; 
    }
    var session = await insertSession(user_id); 
    return session; 
}

export async function loginUser(email: string, password: string) {
    const user = await findUserByEmail(email); 
    if (!user) {
        console.log("User not found"); 
        return null; 
    }
    const isAuthenticated = isValidPassword(password, user.password_hash); 
    if (!isAuthenticated) {
        console.log("UNAUTHORIZED 🥴"); 
        return null; 
    } else {
        const newSession: Session = await createSession(user.id); 
        return newSession; 
    }
}

export async function revokeUserSession(session_id: string) {
    try {
        await revokeSession(session_id);
    } catch(e) {
        console.log("Logout Error in auth.services: " + e); 
        throw(e); 
    }
}

// helper functions 

async function extendSession(session_id: string) {
    await extendSessionById(session_id);
}

function add24Hours(date: Date) {
    return new Date(date.getTime() + 24 * 60 * 60 * 1000);
}