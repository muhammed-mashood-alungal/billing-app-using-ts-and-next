import express from 'express'
import productRouter from './routes/product.routes'
import sequelize, { startServer } from './config/database';
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

startServer()
  
export {app} 
