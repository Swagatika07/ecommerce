import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routers/authRouter.js';
import userRouter from './routers/userRouter.js';
import connectCloudinary from './config/cloudinary.js';
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));

app.get('/', (req, res) => {
    res.send('Hello World! API is workinggg');
});
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});