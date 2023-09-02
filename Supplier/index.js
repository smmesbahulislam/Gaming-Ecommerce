import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js';
import cors from 'cors'
import morgan from 'morgan'

import supplierRoutes from './routes/supplierRoutes.js'
import { updateOrderStatusUsingOid } from './controllers/supplierController.js';




//configure env
dotenv.config();


//database connection
connectDB();

const app = express();
const port = 4003


//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


//routes
app.use('/api/v1/supplier',supplierRoutes);

//test api
app.get('/',(req, res) => {
    res.send("<h1>This is supplier api</h1>")
})


//run listen
app.listen(port, () => {
    console.log(`Supplier server running on ${port}`);
})
