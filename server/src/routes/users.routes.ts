import { Router } from "express"; 
import { createUser, getUserById, getUserByEmail, updateUser, deleteUser } from "../controllers/users.controller.js"; 
const router = Router(); 

router.post("/", createUser); 
router.get("/", getUserById)


export default router; 