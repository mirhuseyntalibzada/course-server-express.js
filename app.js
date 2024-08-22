import express from 'express'
import { connect } from 'mongoose';
import dotenv from 'dotenv'
import appRouter from './router/routers.js'

const app = express()
app.use(express.json())
dotenv.config()
const PORT = process.env.NODE_PORT
const CONNECTION_STRING = process.env.CONNECTION_STRING

app.use("/",appRouter)

app.listen(PORT, () => {
    console.log('your app is on');
    connect(CONNECTION_STRING).then(() => {
        console.log('connected');
    })
})