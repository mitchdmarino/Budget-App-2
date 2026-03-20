import type { Request, Response } from "express";
import { createUser } from "../services/user.services.js";
import { createSession, loginUser, revokeUserSession } from "../services/auth.services.js";
import { setSessionCookie } from "../utils/utils.js";

var DEBUG = true;

export async function register(req: Request, res: Response) {
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
        return res.status(201).json({ msg: "Success", session_id: session_id });
    } catch (err: any) {
        console.log(err);
    }
}

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        const validSession = await loginUser(email, password);
        if (!validSession) {
            if (DEBUG) console.log("session could not be created for " + email);
            return null;
        }
        const session_id = validSession.id;
        setSessionCookie(session_id, res);
        return res.status(201).json({ msg: "Success", session_id: session_id });
    } catch (err: any) {
        console.log(err);
    }
}

export async function logout(req: Request, res: Response) {
    try {
        const session_id = req.cookies.session_id;
        if (session_id) {
            await revokeUserSession(session_id);
            res.clearCookie("session_id", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
            });
            return res.status(200).json({ msg: "You have been logged out successfully." });
        }
        else {
            return res.status(400).json({msg: "No session_id provided"})
        }
    } catch (err: any) {
        console.log(err);
    }
}
