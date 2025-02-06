import express from 'express'
import productRouter from './routes/product.routes'
import  { startServer } from './config/database';
import { errorHandler } from './middlewares/error.middleware';
import cors from 'cors'
const app = express()

app.use(cors({
    origin: "*",  
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false
}));
app.use(express.json())

app.use('/api/products',productRouter)

app.use(errorHandler)
startServer()
  
export {app} 
