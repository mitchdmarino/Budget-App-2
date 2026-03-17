import type { Session } from "../types/session.js";
import type { Request, Response, NextFunction } from 'express';
import { extendSessionById, findSessionById } from "../repositories/auth.repo.js";
import { getUserById } from "../repositories/users.repo.js";

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
    
}

// helper functions 

async function extendSession(session_id: string) {
    await extendSessionById(session_id);
}

function add24Hours(date: Date) {
    return new Date(date.getTime() + 24 * 60 * 60 * 1000);
}

export async function setSessionCookie(session_id: string, res: Response) {
    res.cookie("session_id", session_id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 14 * 24 * 60 * 60 * 1000 // 2 weeks 
    });
}