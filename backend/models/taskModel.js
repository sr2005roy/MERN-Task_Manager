const mongoose = require("mongoose");

const taskMongoose = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true,"Please add a name"],
        },
        completed:{
            type: Boolean,
            required: [true,"Please specify completed"],
            default: false
        }
    },{
        timestamps: true,
    }
)

const Task = mongoose.model('Task',taskMongoose);
module.exports = Task;