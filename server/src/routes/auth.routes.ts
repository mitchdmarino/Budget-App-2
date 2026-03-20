console.log("loaded: auth routes"); 
import { Router } from "express"; 
import { register, login, logout } from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
const router = Router(); 

// Public 
router.post("/register", register); 
router.post("/login", login); 

// Private
router.use(requireAuth); 
router.post("/logout", logout); 

export default router; 