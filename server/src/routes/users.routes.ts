import { Router } from "express"; 
import { createUser, getUser, updateUser, deleteUser } from "../controllers/users.controller.js"; 
const router = Router(); 

router.post("/", createUser); 


export default router; 