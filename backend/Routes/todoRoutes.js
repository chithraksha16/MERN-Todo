import express from 'express';
import Todo from '../Models/todoModel.js';
const router=express.Router();

router.get("/",async(req,res)=>{
let todos=await Todo.find();
res.json(todos)
})

router.post("/",async(req,res)=>{
const newTodo=new Todo({text:req.body.text})
const saved=await newTodo.save();
res.json(saved)
})

router.put("/:id",async(req,res)=>{
    const updated= await Todo.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.json(updated)
})

router.delete("/:id",async(req,res)=>{
    await Todo.findByIdAndDelete(req.params.id)
    res.json({sucess:true})
})

export default router
