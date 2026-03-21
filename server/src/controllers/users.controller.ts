import type { Request, Response } from "express"; 
import { insertUser as createUserRepo, getUserById } from "../repositories/users.repo.js"; 

export async function createUser (req: Request, res: Response) {
    console.log(req.body); 
    const { name, password, email } = req.body; 
    //console.log(name); 
    //console.log(email); 
    if (!email || !name) {
        return res.status(400).json({ error: "email and name are required "}); 
    }

    try {
        const user = await createUserRepo(email, password, name); 
        return res.status(201).json(user); 
    } catch(err: any) {
        if (err.code === "23505") {
            // postgres unique_violation
            return res.status(409).json({error: "Email already exists"}); 
        }
        console.error(err); 
        return res.status(500).json({error: "Internal server error"}); 
    }
}

export async function getMe(req: Request, res: Response) {
    if (req.user) {
        const user_id = req.user.id; 
        if (!user_id) {
            return res.status(500).json({error: "Internal Server Error"}); 
        }
        const thisUser = await getUserById(user_id); 
        if (!thisUser) {
            return res.status(500).json({error: "Internal Server Error"});
        }
        return res.status(200).json({user: thisUser}); 
        
    }
}