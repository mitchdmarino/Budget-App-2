import { Router } from "express"; 
import { createAccount} from "../controllers/accounts.controller.js"; 
const router = Router(); 

router.post("/", createAccount); 


export default router; 