import React, { useState } from 'react'
import axios from 'axios';

const Create = ({ setTodos, todos }) => {
  const [task, setTask] = useState();
  const handleAdd = () =>{
    axios.post("http://localhost:3001/add", { task: task })
    .then((result) => {
      console.log(result);
      // Update the local state with the new todo
      setTodos([...todos, result.data]); // Assuming result.data contains the new todo
      setTask(''); // Clear input field after adding
    })
    .catch(err => console.log(err));
}
const handleKeyPress=(event)=>{
  if(event.key === 'Enter'){
    handleAdd();
  }
}

  return (
    <div className='flex gap-5 mb-10'>
      <input className='w-[400px] max-sm:w-[300px] h-10 border-[1px] border-black rounded-full pl-4' 
      value={task} type="text" 
      onKeyPress={handleKeyPress}
      onChange={(e)=>setTask(e.target.value)}
      
      />
      <button className='bg-orage-100 text-xl bg-green-400 px-5 rounded-2xl' onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Create