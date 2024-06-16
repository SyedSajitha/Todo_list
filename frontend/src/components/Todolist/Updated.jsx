import React from 'react';
import { FaCircle } from "react-icons/fa";

const Updated = ({ currentEditedItem, handleUpdatedTitle, handleUpdatedPriority, handleUpdateTodo }) => (
  <div className='edit__wrapper'>
    <input
      placeholder='Updated Title'
      onChange={(e) => handleUpdatedTitle(e.target.value)}
      value={currentEditedItem.title}
    />
    <div className='priority-icons'>
      <FaCircle className={`low ${currentEditedItem.priority === 'low' && 'active'}`} onClick={() => handleUpdatedPriority('low')} title='low?' />
      <FaCircle className={`medium ${currentEditedItem.priority === 'medium' && 'active'}`} onClick={() => handleUpdatedPriority('medium')} title='medium?' />
      <FaCircle className={`high ${currentEditedItem.priority === 'high' && 'active'}`} onClick={() => handleUpdatedPriority('high')} title='high?' />
    </div>
    <button type='button' onClick={handleUpdateTodo} className='primarybtn'>Update</button>
  </div>
);

export default Updated;