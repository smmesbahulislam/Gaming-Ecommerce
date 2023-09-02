import dotenv from "dotenv"
import express from 'express'
// import bodyParser from 'body-parser'
// import multer from "multer";
// import path from 'path'
import connectDB from "./config/db.js";
import bankRoutes from './routes/bankRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js'
import cors from 'cors';
import morgan from "morgan";

//configure env
dotenv.config();


//database connection
connectDB();


// var upload = multer();
const app = express();
// const bankApi = "/bank/api/v1";
const port = 4002


// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
// var urlencodedParser = bodyParser.urlencoded({extended: true});
// app.use(upload.array());

//routes
app.use('/api/v1/bank',bankRoutes);
app.use('/api/v1/transaction',transactionRoutes);

//rest api
app.get("/",(req,res) => {
    res.send("<h1>Hello There</h1>");
});

//run listen
app.listen(port, () => {
    console.log(`Server Running on ${port}`);
});

