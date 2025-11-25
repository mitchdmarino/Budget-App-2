import express from 'express'; 
import cors from 'cors'; 
import type { Request, Response } from 'express'; 

const app = express(); 
const port = 8000; 

// enable cors for cross origin resource sharing
app.use(cors()); 

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Express with TypeScript!'); 
}); 

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`); 
}); 

