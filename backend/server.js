const { error } = require("console");
const express = require("express");
const mongoose = require("mongoose");
const todo = require("./models/todo");
const cors = require("cors");
require("dotenv").config()

const app = express();
app.use(express.json());
app.use(cors())
const port = 8080;

const connectToMongo = async () => {
    try {
        await mongoose.connect("mongodb+srv://admin-nikhil:Nikhil5787@cluster0.efyjl.mongodb.net/", { useNewUrlParser: true });
        console.log('connected to MongoDB');
    } catch (error) {
        console.log('error connection to MongoDB:', error.message);
    }
};

connectToMongo()

app.get("/", async function (req, res) {
    const todos = await todo.find();
    res.send(todos)
})

app.post("/", async function (req, res) {
    console.log(req.body)
    const title = req.body.title;
    const description = req.body.description;
    const status = req.body.status;

    const newTodo = new todo({
        title: title,
        description: description,
        status: status,
    })
    await newTodo.save()
    res.send(newTodo)
})

app.put("/", async function (req, res) {
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;

    let updatedThings;
    if (description === undefined) {
        updatedThings = await todo.findOneAndUpdate({ _id: id }, { title: title })
    }
    else if (title === undefined) {
        updatedThings = await todo.findOneAndUpdate({ _id: id }, { description: description })
    }
    else {
        updatedThings = await todo.findOneAndUpdate({ _id: id }, { title: title, description: description });
    }

    res.send(updatedThings);
})

app.delete("/", async function (req, res) {
    const id = req.body.id;

    const deleteId = await todo.deleteOne({ _id: id });
    res.send({
        msg: "deleted success" + deleteId.deletedCount
    });
})

app.put("/status", async function (req, res) {
    const id = req.body.id;
    const status = req.body.status;

    const updatedStatus = await todo.findOneAndUpdate({ _id: id }, { status: status })
    res.send(updatedStatus);
})

app.listen(port, serverConnection);
function serverConnection() {
    console.log("server connect at port: " + port)
}