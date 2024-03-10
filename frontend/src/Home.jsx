import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(result => {
        setTodos(result.data);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.post('http://localhost:3001/delete/' + id)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }
  

  const handleDone = (id)=>{
   console.log(id);
  }
  

  return (
    <div className='h-screen py-10'>
    <div className='mx-auto bg-gray-100 lg:w-[50%] h-full md:w-[70%] sm:w-[80%] max-sm:w-[90%] flex flex-col items-center shadow-2xl rounded-2xl border-black border-2'>
      <h2 className='bg-white text-xl my-5 p-4 rounded-xl'>ToDo List</h2>
      <Create />
      <div className='h-[450px] w-[500px]  overflow-auto'>
      {
        todos.length === 0 ? (
          <div>No todos found</div>
        ) : (
      todos.map((tod) => (
          <div key={tod._id} className='w-[450px] h-[50px] text-lg px-5 flex justify-between bg-gray-300 text-black items-center m-2 rounded-xl'>
              <p className={tod.done && 'line-through'}>* {tod.todo}</p>
            <div className='flex gap-2'>
            <button className='bg-blue-400 px-3 py-1 rounded-xl' onClick={handleDone(tod._id)}>Done</button>
            <button className='bg-red-400 px-3 py-1 rounded-xl' onClick={handleDelete(tod._id)}>delete</button>
            </div>
          </div>
        )))}
    </div>
   </div>
  </div>
  );
}

export default Home;
