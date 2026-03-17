import type { Request, Response } from "express"; 
import { createUser, findUserByEmail } from "../services/user.services.js";
import { createSession, loginUser } from "../services/auth.services.js";

var DEBUG = true; 

export async function register (req: Request, res: Response) {
    try {
        const { email, password, name } = req.body; 
        const newUser = await createUser(email, password, name);
        if (!newUser) {
            // should error out 
            if (DEBUG) console.log("user could not be created for " + email)
            return null; 
        }
        const newSession = await createSession(newUser.id);  
        if (!newSession) {
            if (DEBUG) console.log("session could not be created for " + newUser.emailAddress)
            return null; 
        }
        const session_id = newSession.id; 
        setSessionCookie(session_id, res); 
        return res.status(201).json({msg: "Success", session_id: session_id}); 
    } catch (err: any) {
        console.log(err); 
    }
}

export async function login (req: Request, res: Response) {
    try {
        const { email, password } = req.body; 
        const validSession = await loginUser(email, password); 
        if (!validSession) {
            if (DEBUG) console.log("session could not be created for " + email);
            return null;  
        }
        const session_id = validSession.id; 
        setSessionCookie(session_id, res); 
        return res.status(201).json({msg: "Success", session_id: session_id}); 
    } catch (err: any) {
        console.log(err);
    }
}

export async function logout (req: Request, res: Response) {
    try {
        return res.status(201).json({msg: "Not implemented yet"})
    } catch (err: any) {
        console.log(err);
    }
}


// helper function 
export async function setSessionCookie(session_id: string, res: Response) {
    res.cookie("session_id", session_id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 14 * 24 * 60 * 60 * 1000 // 2 weeks 
    });
}