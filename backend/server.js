//requires
const express = require('express');
// const connectDB = require("./config/connectDB");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const Task = require("./models/taskModel");
const cors = require('cors');

//variables
const app = express();
const PORT = process.env.PORT || 5000;

//* Routes

app.use(cors({
    origin: ["http://localhost:3000","https://mern-task-manager-frontend-dxar.onrender.com"]
}))
app.get('/',(req,res)=>{
    console.log(`request made on ${req.url}`);
    res.send("Hello World!!");
})

app.post('/api/tasks',express.json(),express.urlencoded({ extended:false }),async (req,res)=>{
    console.log(`request made on ${req.url}`);
    try {
        const task = await Task.create(req.body);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
})

app.get('/api/tasks', async (req,res)=>{
    console.log(`request made on ${req.url}`);
    try {
        const task = await Task.find();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
})

app.get('/api/tasks/:id',async (req,res)=>{
    console.log(`request made on ${req.url}`);
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
})

app.delete('/api/tasks/:id',async (req,res)=>{
    console.log(`request made on ${req.url}`);
    const id = req.params.id;
    try {
        const task = await Task.findByIdAndDelete(id)
        res.status(200).json({msg : `deleted : ${id}` })
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
})

app.put('/api/tasks/:id',express.json(),express.urlencoded({ extended:false }),async (req,res)=>{
    console.log(`request made on ${req.url}`);
    const id = req.params.id;
    try {
        const task = await Task.findByIdAndUpdate(id,req.body,{
            new: true,
            runValidators: true
        })
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
})

//? server
// const StartServer = async()=>{
//     await connectDB();
//     app.listen(PORT,()=>{
//         console.log(`listening on port ${PORT}`);
//     });
// }
// StartServer();

// ! not using connectDB
mongoose.connect(process.env.MONGO_URI)
    .then((c)=>{
        console.log(`MONGO Connected : ${c.connection.host}`);
        app.listen(PORT,()=>console.log(`listion on port: ${PORT}`));
    })
    .catch(err=>console.log(err));