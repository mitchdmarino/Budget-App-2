import type { Request, Response } from "express";
import bcrypt from "bcrypt"; 

const SALT_ROUNDS = 12; 

export async function setSessionCookie(session_id: string, res: Response) {
    res.cookie("session_id", session_id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 14 * 24 * 60 * 60 * 1000 // 2 weeks 
    });
    return; 
}

export async function hashUserPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword; 
}

export async function isValidPassword(hashedPassword: string, givenPassword: string) {
    const isValid = await bcrypt.compare(givenPassword, hashedPassword);
    return isValid; 
}