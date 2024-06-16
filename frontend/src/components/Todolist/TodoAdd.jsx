import React from 'react';
import { FaCircle } from "react-icons/fa";
import { RiAddBoxLine } from "react-icons/ri";
import axios from 'axios';
import { useUser } from "@clerk/clerk-react";

const TodoAdd = ({ newTitle, setNewTitle, newPriority, setNewPriority , category}) => {
const {user} = useUser()
  const handleAddTodo = async () => {
    try {
      if (!newTitle.trim()) {
        alert('Please add some text for the todo!');
        return;
      }
      
      let now = new Date();
      let addedOn = now.toLocaleString();
      let newTodoItem = { title: newTitle, priority: newPriority, addedOn: addedOn, pinned: false };

      // Send POST request to add todo
      await axios.post('http://localhost:5000/todos', {
        title: newTitle, priority: newPriority, addedOn: addedOn, pinned: false, category : category, clerkId:user.id
      });

      // Handle success, clear input fields
      setNewTitle('');
      setNewPriority('low');
    } catch (error) {
      // Handle error
      console.error('Error adding todo:', error);
      alert('Error adding todo. Please try again later.');
    }
  };

  return (
    <div className="todo-input space-x-1">
      <div className="todo-input-item pl-2">
        <label className='rounded pl-1'>Add your task</label>
        <input className='pl-2' type='text' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder='Add your task' />
      </div>
      <div className='priority-icons flex flex-row outline-none cursor-pointer mt-11'>
        <FaCircle className={`low ${newPriority === 'low' && 'active'}`} onClick={() => setNewPriority('low')} title='low?' />
        <FaCircle className={`medium ${newPriority === 'medium' && 'active'}`} onClick={() => setNewPriority('medium')} title='medium?' />
        <FaCircle className={`high ${newPriority === 'high' && 'active'}`} onClick={() => setNewPriority('high')} title='high?' />
      </div>
      <div className="todo-input-item">
        <RiAddBoxLine onClick={handleAddTodo} size={30} className='add-button mt-11' title='Add!' />
      </div>
    </div>
  );
};

export default TodoAdd;