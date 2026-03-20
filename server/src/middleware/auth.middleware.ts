import type { Request, Response, NextFunction } from 'express';
import { verifySessionAndReturnUser } from '../services/auth.services.js';
import { setSessionCookie } from '../utils/utils.js';

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (!req || !res || !next) {
        throw new Error("Middleware not receiving proper Express arguments");
    }
    try {
        // get the session_id cookie from the request
        const session_id = req.cookies.session_id;
        // find the user from the session in our table
        if (session_id) {
            //const userSession = null; 
            const userSession = await verifySessionAndReturnUser(session_id);
            if (userSession) {
                const userId = userSession.user_id;
                const sessionExtended = userSession.sessionExtended;
                // attach req.user if session found and valid 
                (req as any).user = { id: userId };
                //req.user = { id: userId };
                if (sessionExtended) {
                    setSessionCookie(session_id, res); 
                }
                next();
                return;
            }
        }
        // handle invalid session and errors 
        return res.status(401).json({ msg: "Not authorized" });
    }
    catch (err: any) {
        console.log("Error in requireAuthMiddleware" + err);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

