import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsCheckSquare } from "react-icons/bs";
import { Pin, PinOff } from 'lucide-react';

const PinnedTodos = ({ todos, handleDeleteTodo, handleComplete, handleEdit, handlePinTodo, getPriorityColor }) => (
  <>
    {todos
      .filter(todo => todo.pinned)
      .map((item, index) => (
        <div className={`todo-list-item ${getPriorityColor(item.priority)}`} key={index}>
          <div>
            <h1>{item.title}</h1>
            {item.addedOn && <p><small>Added on: {item.addedOn}</small></p>}
            {item.updatedOn && <p><small>Updated on: {item.updatedOn}</small></p>}
          </div>
          <div className='icons flex flex-row'>
            <AiOutlineDelete className='del-icon' size={27} onClick={() => handleDeleteTodo(index)} title='Delete?' />
            <BsCheckSquare className='check-icon' size={20} onClick={() => handleComplete(index)} title='Complete?' />
            <AiOutlineEdit className='check-icon' size={22} onClick={() => handleEdit(index, item)} title='Edit?' />
            {item.pinned ? (
              <PinOff className='pin-icon pt-1' size={27} onClick={() => handlePinTodo(index)} title='Unpin?' />
            ) : (
              <Pin className='pin-icon pt-1' size={27} onClick={() => handlePinTodo(index)} title='Pin?' />
            )}
          </div>
        </div>
      ))
    }
  </>
);

export default PinnedTodos;


