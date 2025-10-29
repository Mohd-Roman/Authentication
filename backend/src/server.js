import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './database/db.js';
import authRouter from './Routers/auth.route.js';

const app= express();
dotenv.config();

const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const corsOptions ={
    origin:'http:localhost:5173',
    credentials:true
}
app.use(cors(corsOptions))

// api endpoints
app.use('/api/auth',authRouter) //router
app.get('/',(req,res)=>{
    res.send("hi")
})
app.listen(PORT,(req,res)=>{
    connectDB()
    console.log(` server start http://localhost:${PORT}`)
})