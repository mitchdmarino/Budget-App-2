import { Router } from "express"; 
import { createUser, getMe} from "../controllers/users.controller.js"; 
import { requireAuth } from "../middleware/auth.middleware.js";
const router = Router(); 

router.post("/", createUser); 

// private 
router.use(requireAuth); 
router.get("/me", getMe); 

export default router; 