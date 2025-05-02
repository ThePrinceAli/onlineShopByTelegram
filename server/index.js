import express from 'express'
import cors from "cors";
import 'dotenv/config'
import mongoose from 'mongoose';
import { startBot } from './bot.js';
const app = express()  
  
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

startBot()
 
mongoose.connect(process.env.MongoUrl)
    .then(() => console.log('Connected!'));
app.listen(4100, () => console.log('Server is running'))