import express, { response } from 'express'
import cors from "cors";
import 'dotenv/config'
import mongoose from 'mongoose';
import { startBot } from './bot.js';
import { CardModel } from './Card.js';
const app = express()

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.get("/", (req, res) => {
    CardModel.find()
        .then((response) => res.send(response))
        .catch((err) => console.log(err))
})

startBot()

mongoose.connect(process.env.MongoUrl)
    .then(() => console.log('Connected!'));
app.listen(4100, () => console.log('Server is running'))