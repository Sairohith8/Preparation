const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());

let tasks = [];
let id = 1;

app.get('/tasks',(req,res)=>{
    res.json(tasks);
})

app.post("/tasks",(req,res)=>{
    const task = { id: id++,...req.body};
    tasks.push(task);
    res.status(201).json(task);
});

app.put("/tasks/:id",(req,res) => {
    const taskId = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === taskId);
    if (index === -1 ) return res.status(404).json({error: 'Task not found'});

    tasks[index]={id: taskId, ...req.body};
    res.json(tasks[index]);
});

