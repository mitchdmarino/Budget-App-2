import type { Request, Response } from "express"; 
import { createUser as createUserRepo } from "../repositories/users.repo.js"; 

export async function createUser (req: Request, res: Response) {
    const { email, name } = req.body; 

    if (!email || name) {
        return res.status(400).json({ error: "email and name are required "}); 
    }

    try {
        const user = await createUserRepo(email, name); 
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

export async function getUser (req: Request, res: Response) {
    try {
        return res.status(201).json({msg: "Not implemented yet"})
    } catch (err: any) {
        
    }
}

export async function updateUser (req: Request, res: Response) {
    try {
        return res.status(201).json({msg: "Not implemented yet"})
    } catch (err: any) {
        
    }
}

export async function deleteUser (req: Request, res: Response) {
    try {
        return res.status(201).json({msg: "Not implemented yet"})
    } catch (err: any) {
        
    }
}