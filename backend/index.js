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
      const todo = await TodoModel.find();
      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });


  app.put('/update/:id', (req, res)=>{
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
  })

  

app.post('/add', (req, res) => {
  const todo = req.body.task;
  TodoModel.create({
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


app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({_id: id})
    .then(() => {
      res.json("Deleted successfully");
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Failed to delete item" });
    });
});




