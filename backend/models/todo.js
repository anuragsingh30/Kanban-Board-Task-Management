const mongoose = require("mongoose");
const TodoSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: ["to-do", "doing", "done"],
        require: true
    },
}, { timestamps: true });

const todo = mongoose.model("ToDo", TodoSchema);
module.exports = todo;