// const express = require("express");
// const mongoose=require("mongoose")
// const todo=require("./models/todo")
// const app = express()
// try{
//     mongoose.connect("mongodb://127.0.0.1:27017/realDB")
//     console.log("DB COnnected")
// } catch(err){
//     console.log("error",err)
// }



// app.use(express.json())

// const port = 9000;

// app.get("/todo",async (req,res) => {
//     const todos= await todo.find()
//     res.send(todos)
// })

// app.post("/todo",async (req,res) => {
//     const title  = req.body.title;
//     const description  = req.body.description;

//     const newTodo = new todo({
//         title:title,
//         description: description
//     })

//     await newTodo.save();

//     res.send("Created");
// })

// app.delete("/todo",(req,res) => {
//     const id = req.body.id;
//     deleteTodo(id);

//     res.send(toyDB);
// })

// app.put("/todo",async (req,res) => {
//     const id = req.body.id;
//     const title = req.body.title;
//     const description=req.body.description;

//     const updatedThing = await todo.findOneAndUpdate({
//         _id:id
//     },{
//         title: title
//     },{
//         description:description
//     })

//     res.send(updatedThing)
// })

// app.listen(port, letMeKnowServerStarted)

// function letMeKnowServerStarted(){
//     console.log("Server started")
// }


const express = require("express");
const mongoose = require("mongoose");
const todo = require("./models/todo");

const app = express();
app.use(express.json());
const port = 9000;

try {
    mongoose.connect("mongodb://127.0.0.1:27017/realDB"); // exectued then go to line 6
    console.log("DB Connected");
} catch (err) {
    console.log("DB Error", err);
}

// let toyDB = [];

// let currentId = 0;

// function addTodo(title, description) {
//     const todoObj = {
//         id: currentId,
//         title: title,
//         description: description,
//     };
//     currentId++;
//     toyDB.push(todoObj);
// }

// function deleteTodo(id) {
//     const newArr = [];
//     for (let i = 0; i < toyDB.length; i++) {
//         if (toyDB[i].id !== id) {
//             newArr.push(toyDB[i]);
//         }
//     }
//     toyDB = newArr;
// }


app.get("/todo", async function (req, res) {
    const todos = await todo.find();
    res.send(todos);
});

app.post("/todo", async function (req, res) {
    const title = req.body.title;
    const description = req.body.description;

    const newTodo = new todo({
        title: title,
        description: description,
    });

    await newTodo.save();

    res.send(newTodo)
});

// app.get("/todo/:todoId", async function (req, res) {
//     const id = req.params.todoId
//     const myTodo = await todo.findById(id);
//     res.send(myTodo)
// })

app.delete("/todo", async function (req, res) {
    const id = req.body.id;
    const deletedId = await todo.deleteOne({ _id: id });

    res.send("Deleted successfully " + deletedId.deletedCount)
});

app.put("/todo", async (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;

    const updatedThing = await todo.findOneAndUpdate({
        _id: id
    }, {
        title: title,
        description: description
    })

    res.send(updatedThing)
})

app.listen(port, letMeKnowServerStarted);

function letMeKnowServerStarted() {
    console.log("Server started");
}