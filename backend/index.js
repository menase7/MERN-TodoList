const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => {
    console.log("db connected");
    app.listen(PORT, () => {
      console.log(`server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

  app.get('/get', async (req, res) => {
    try {
      const todo = await TodoModel.find().sort({createdAt: -1});
      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });


  

app.post('/add', async (req, res) => {
  const todo = req.body.task;
  await TodoModel.create({
    todo: todo
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error('Error saving todo:', err);
      res.status(500).json({ error: 'Error saving todo' });
    });

});


app.put('/update/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(id, { done: true });
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await TodoModel.findByIdAndDelete(id);
    res.json("Deleted successfully");
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.delete('/delete', async (req, res) => {
  try {
    await TodoModel.deleteMany()
    res.json("Deleted successfully");
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});



module.exports = app;


