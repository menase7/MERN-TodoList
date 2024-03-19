import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(result => {
        const reversedTodos = result.data.reverse();
        setTodos(reversedTodos);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(response => {
        console.log(response.data);
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(error => {
        console.error(error);
      });
  }
  

  const handleDone = (id)=>{
    axios.put(`http://localhost:3001/update/${id}`)
    .then(response => {
      console.log(response.data);
      setTodos(
        todos.map(todo => {
          if (todo._id === id) {
            return { ...todo, done: true };
          }
          return todo;
        })
      );
    })
    .catch(error => {
      console.error(error);
    });
  }

  const deleteAll = ()=>{
    axios.delete('http://localhost:3001/delete')
    .then(response=>{
      console.log("all data deleted");
      setTodos([]);
    })
  }
  

  return (
    <div className='h-screen py-10'>
    <div className='mx-auto bg-gray-100 lg:w-[50%] h-full md:w-[70%] sm:w-[80%] max-sm:w-[90%] flex flex-col items-center shadow-2xl rounded-2xl border-black border-2'>
      <h2 className='bg-white text-xl my-5 p-4 rounded-xl'>ToDo List</h2>
      <Create setTodos={setTodos} todos={todos}/>
      <div className='h-[450px] w-[500px]  overflow-auto'>
      <button onClick={deleteAll} className='bg-red-300 rounded-full px-4 text-white'>Clear all</button>
      {
        todos.length === 0 ? (
          <div className='bg-white w-full h-full flex justify-center items-center text-lg'>No todos found</div>
        ) : (
      todos.map((tod) => (
          <div key={tod._id} className='w-[450px] h-[50px] text-lg px-5 flex justify-between bg-gray-300 text-black items-center m-2 rounded-xl'>
              <p className={tod.done && 'line-through'}>* {tod.todo}</p>
            <div className='flex gap-2'>
            <button className='bg-blue-400 px-3 py-1 rounded-xl' onClick={()=> handleDone(tod._id)}>Done</button>
            <button className='bg-red-400 px-3 py-1 rounded-xl' onClick={()=> handleDelete(tod._id)}>delete</button>
            </div>
          </div>
        )))}
    </div>
   </div>
  </div>
  );
}

export default Home;
