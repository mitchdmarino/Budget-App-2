import type { Request, Response } from "express"; 
import { createAccount as createAccountRepo } from "../repositories/accounts.repo.js";

export async function createAccount (req: Request, res: Response) {
    console.log(req.body); 
    const { name } = req.body; 
     if (!name) {
        return res.status(400).json({ error: "name required "}); 
    }

    try {
        const account = await createAccountRepo('test', name); 
        return res.status(201).json(account); 
    } catch(err: any) {
        if (err.code === "23505") {
            // postgres unique_violation
            return res.status(409).json({error: "Name already exists for this user"}); 
        }
        console.error(err); 
        return res.status(500).json({error: "Internal server error"}); 
    }
}

