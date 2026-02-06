import type { Request, Response, NextFunction } from 'express'; 
import { verifySessionAndReturnUser } from '../services/auth.services.js';

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
    try {
        // get the session_id cookie from the request
        const session_id = req.cookies.session_id; 
        // find the user from the session in our table
        if (session_id) {
            const user = await verifySessionAndReturnUser(session_id); 
            // attach req.user if session found and valid 
            if (user) {
                req.user = {id: user.id}; 
                next(); 
                return; 
            }
        } 
        // handle invalid session and errors 
        return res.status(401).json({msg: "Not authorized"}); 
    }
    catch(err: any) {
        console.log("Error in requireAuthMiddleware" + err); 
        return res.status(500).json({msg: "Internal Server Error"})
    }
}