const mongoose=require("mongoose")
const TodoSchema=mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    }
})

const todo = mongoose.model("Todo",TodoSchema);

module.exports = todo


