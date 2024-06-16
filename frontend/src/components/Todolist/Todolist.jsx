import React, { useEffect, useState } from 'react';
import { Button } from '../shad/ui/button';
import TodoAdd from './TodoAdd';
import CompletedTodo from './CompletedTodo';
import Updated from './Updated';
import PinnedTodos from './PinnedTodos';
import TodoInfographic from './TodoInfographic';
import './Todolist.css';
import { BsCheckSquare } from 'react-icons/bs';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { Pin, PinOff } from 'lucide-react'

const Todolist = ({ category, todos = [], updateTodos }) => {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] = useState("low");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState('');
  const [currentEditedItem, setCurrentEditedItem] = useState('');

  const handleAddTodo = () => {
    if (!newTitle.trim()) {
      alert('Please add some text for the todo!');
      return;
    }
    let now = new Date();
    let addedOn = now.toLocaleString();
    let newTodoItem = { title: newTitle, priority: newPriority, addedOn: addedOn, pinned: false };
    let updatedTodoArr = [newTodoItem, ...todos]; // Add the new todo at the beginning
    updateTodos(category, updatedTodoArr);
    setNewTitle('');
    setNewPriority('low');
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...todos];
    reducedTodo.splice(index, 1);
    updateTodos(category, reducedTodo);
  };

  const handleComplete = (index) => {
    let now = new Date();
    let completedOn = now.toLocaleString();
    let filteredItem = { ...todos[index], completedOn: completedOn };
    let updatedCompleteArr = [...completedTodos, filteredItem];
    setCompletedTodos(updatedCompleteArr);
    handleDeleteTodo(index);
    localStorage.setItem(`${category}_completedTodos`, JSON.stringify(updatedCompleteArr));
  };

  const handleDeleteCompletedTodo = (index) => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1);
    setCompletedTodos(reducedTodo);
    localStorage.setItem(`${category}_completedTodos`, JSON.stringify(reducedTodo));
  };

  const handlePinTodo = (index) => {
    let updatedTodos = todos.map((todo, i) => i === index ? { ...todo, pinned: !todo.pinned } : todo);
    updateTodos(category, updatedTodos);
  };

  useEffect(() => {
    let savedCompletedTodo = JSON.parse(localStorage.getItem(`${category}_completedTodos`)) || [];
    setCompletedTodos(savedCompletedTodo);
  }, [category]);

  const handleEdit = (ind, item) => {
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  };

  const handleUpdatedTitle = (value) => {
    setCurrentEditedItem((prev) => ({ ...prev, title: value }));
  };

  const handleUpdatedPriority = (value) => {
    setCurrentEditedItem((prev) => ({ ...prev, priority: value }));
  };

  const handleUpdateTodo = () => {
    let now = new Date();
    let updatedOn = now.toLocaleString();
    let newTodo = [...todos];
    newTodo[currentEdit] = { ...currentEditedItem, updatedOn: updatedOn };
    updateTodos(category, newTodo);
    setCurrentEdit("");
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-white';
      case 'low':
        return 'bg-green-500 text-white';
      default:
        return 'text-black';
    }
  };

  return (
    
    <div className="container">
      {/* <h1 className='category-title'>{category}  Todos and Infographic </h1> */}
      <div className="todo-wrapper rounded-lg">
        <TodoAdd
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          newPriority={newPriority}
          setNewPriority={setNewPriority}
          handleAddTodo={handleAddTodo}
        />
        <hr />
        <div className="btn-area space-x-4">
          <Button className={`activebtn text-white text-base ${isCompleteScreen === false && `active`}`} variant="link" onClick={() => { setIsCompleteScreen(false); }}>Todo</Button>
          <Button className={`activebtn text-white text-base ${isCompleteScreen === true && `active`}`} variant="link" onClick={() => { setIsCompleteScreen(true); }}>Completed</Button>
        </div>
        <div className='todo-list'>
          {isCompleteScreen === false && (
            <>
              <PinnedTodos
                todos={todos}
                handleDeleteTodo={handleDeleteTodo}
                handleComplete={handleComplete}
                handleEdit={handleEdit}
                handlePinTodo={handlePinTodo}
                getPriorityColor={getPriorityColor}
              />
              {todos
                .filter(todo => !todo.pinned)
                .map((item, index) => {
                  if (currentEdit === index) {
                    return (
                      <Updated
                        key={index}
                        currentEditedItem={currentEditedItem}
                        handleUpdatedTitle={handleUpdatedTitle}
                        handleUpdatedPriority={handleUpdatedPriority}
                        handleUpdateTodo={handleUpdateTodo}
                      />
                    );
                  } else {
                    return (
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
                    );
                  }
                })}
            </>
          )}

          {isCompleteScreen === true && completedTodos.map((item, index) => {
            return (
              <CompletedTodo
                key={index}
                item={item}
                handleDeleteCompletedTodo={() => handleDeleteCompletedTodo(index)}
              />
            )
          })}
        </div>
      </div>
      <div className='infographic-wrapper'>
        <TodoInfographic category={category} todos={todos} completedTodos={completedTodos} />
      </div>
    </div>
  );
};

export default Todolist;
