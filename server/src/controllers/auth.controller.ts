import type { Request, Response } from "express"; 
import { registerUser, loginUser } from "../repositories/auth.repo.js";

export async function register (req: Request, res: Response) {
    try {
        return res.status(201).json({msg: "Not implemented yet"})
    } catch (err: any) {
        
    }
}

export async function login (req: Request, res: Response) {
    try {
        return res.status(201).json({msg: "Not implemented yet"})
    } catch (err: any) {
        
    }
}

export async function logout (req: Request, res: Response) {
    try {
        return res.status(201).json({msg: "Not implemented yet"})
    } catch (err: any) {
        
    }
}