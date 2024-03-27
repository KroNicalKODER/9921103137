import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from './routes/Auth.js'

const app = express()

dotenv.config()
app.use(cors())
const PORT = process.env.PORT || 8800

mongoose.set('strictQuery',true)
const connect = ()=>{
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("Connected to Database")
    }).catch((err)=>{
        throw err
    })
}

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// ROUTES HERE
app.use('/api',authRoutes)


app.use((err,req,res,next)=>{
    const status = err.status || 500
    const message = err.message || "Unknown Error Occured"
    return res.status(status).json({
        success: false,
        status,
        message
    })
})


app.listen(PORT,()=>{
    connect()
    console.log("Connected to server")
})