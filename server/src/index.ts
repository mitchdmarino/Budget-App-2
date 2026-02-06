import "dotenv/config";
import express from 'express'; 
import cors from 'cors'; 
import cookieParser from "cookie-parser";
import type { Request, Response } from 'express'; 
import { pool } from "./db/pool.js";

// route imports 
import usersRoutes from "./routes/users.routes.js"; 
import authRoutes from "./routes/auth.routes.js"; 

const app = express(); 
const port = process.env.PORT || 8000; 

app.use(express.json()); 
// enable cors for cross origin resource sharing
app.use(cors()); 
app.use(cookieParser()); 

// routes
app.use("/api/users", usersRoutes); 
app.use("/api/auth", authRoutes); 

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Express with TypeScript!'); 
}); 

app.get("/health", async (_req, res) => {
  const result = await pool.query("SELECT 1");
  res.json({ ok: true, db: result.rowCount === 1 });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`); 
}); 

