import React from 'react';
import { FaCircle } from "react-icons/fa";
import { RiAddBoxLine } from "react-icons/ri";

const TodoAdd = ({ newTitle, setNewTitle, newPriority, setNewPriority, handleAddTodo }) => (
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

export default TodoAdd;