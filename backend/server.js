import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import todoRouter from './Routes/todoRoutes.js'
const app=express();
const PORT=4000;


//middleware
app.use(cors());
app.use(express.json())


//api routes
app.use("/api/todos",todoRouter)

mongoose.connect("mongodb+srv://kharvichithraksha:lnLwMkqTDY5qn9RV@cluster0.lpyfmtl.mongodb.net/",
    {
        dbName:"TodoList"
    }
)
.then(()=>console.log("Database is connected sucessfully"))
.catch((err)=>console.log("Database Connection Failed",err))


app.listen(PORT,()=>console.log(`server is running on PORT ${PORT}`))

