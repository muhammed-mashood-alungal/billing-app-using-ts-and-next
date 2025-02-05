import express from 'express'
import productRouter from './routes/product.routes'
import sequelize, { startServer } from './config/database';
const app = express()

app.use(express.json())

app.use('/api/products',productRouter)

startServer()
  
export {app} 
