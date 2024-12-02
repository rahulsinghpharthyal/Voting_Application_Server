import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dbConnection from './database/dbConnection.js';

dotenv.config({path: './config/.env'});
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: ['http://localhost:5173', process.env.CLIENT_URI ], // Allow only this origin 
    methods: 'GET, POST, PUT, DELETE, PATCH', // Allow these methods 
    allowedHeaders: 'Content-Type, Authorization', // Allow these headers 
    credentials: true // Allow credentials
}))


// ----------------------------------------Routes-------------------------------------------------------
import { errorMiddleware } from './middleware/error.js';
import userRoute from './routes/userRoute.js';
import candidateRoute from './routes/candidateRoute.js';
import voteRoute from './routes/voteRoute.js';
import refreshTokenRoute from './routes/refreshTokenRoute.js';
import authenticateRoute from './routes/authenticateRoute.js';

app.use('/api/v1/', refreshTokenRoute);
app.use("/authenticate", authenticateRoute);
app.use('/api/v1', userRoute);
app.use('/api/v1/candidate', candidateRoute);
app.use('/api/v1', voteRoute);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async()=>{
    await dbConnection();
    console.log(`Server Listning at http://localhost:${PORT}`)
})