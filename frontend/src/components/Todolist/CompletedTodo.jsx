import React from 'react';
import { AiOutlineDelete } from "react-icons/ai";

const CompletedTodo = ({ item, handleDeleteCompletedTodo }) => (
  <div className='todo-list-item'>
    <div>
      <h1>{item.title}</h1>
      <p><small>Completed on: {item.completedOn}</small></p>
    </div>
    <div className='icons'>
      <AiOutlineDelete className='del-icon' onClick={handleDeleteCompletedTodo} title='Delete?' />
    </div>
  </div>
);

export default CompletedTodo;
