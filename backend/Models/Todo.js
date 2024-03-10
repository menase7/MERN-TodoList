const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  todo: String,
  done: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const TodoModel = mongoose.model("todos", TodoSchema)
module.exports = TodoModel