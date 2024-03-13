const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TaskModel = require('./models/Task')

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://faishal24:kleopatra700@cluster0.mtjavum.mongodb.net/TaskManagement")

// route
app.get('/get', (req, res) => {
    TaskModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post('/add', (req, res) => {
    const task = req.body.task;
    TaskModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    TaskModel.findByIdAndUpdate({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    TaskModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
