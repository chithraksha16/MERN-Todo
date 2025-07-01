import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'
import todoRouter from './Routes/todoRoutes.js'
const app=express();
const PORT=4000;
dotenv.config()


//middleware
app.use(cors());
app.use(express.json())


//api routes
app.use("/api/todos",todoRouter)

mongoose.connect(process.env.MONGO_URI,
    {
        dbName:"TodoList"
    }
)
.then(()=>console.log("Database is connected sucessfully"))
.catch((err)=>console.log("Database Connection Failed",err))


app.listen(PORT,()=>console.log(`server is running on PORT ${PORT}`))

