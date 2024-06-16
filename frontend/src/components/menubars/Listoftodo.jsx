import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../shad/ui/card";
import './Listoftodo.css'; // Ensure you have this import for your styles
import Todolist from '../Todolist/Todolist';
import { Button } from '../shad/ui/button';
import { IoIosArrowBack } from "react-icons/io";
import Menubar from '@/pages/Menubar';
import { useNavigate } from 'react-router-dom';

const cardsData = [
  { title: '🧑 Personal', description: 'Add your Personal ToDo' },
  { title: '💼 Work', description: 'Add your Work Tasks' },
  { title: '🛍️ Shopping', description: 'Add your Shopping List' },
  { title: '💪 Fitness', description: 'Add your Fitness Goals' },
  { title: '✨ Hobbies', description: 'Add your Hobby Tasks' },
  { title: '</> Coding', description: 'Add your Coding Todo' },
  { title: '💸 Finance', description: 'Add your Finance Todos' },
];

const Listoftodo = () => {
  const [todos, setTodos] = useState({
    Personal: [],
    Work: [],
    Shopping: [],
    Fitness: [],
    Hobbies: [],
    Coding: [],
    Finance: []
  });
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [searchTerm, setSearchTerm] = useState('')

  const navigate = useNavigate();
  const navigateBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || {
      Personal: [],
      Work: [],
      Shopping: [],
      Fitness: [],
      Hobbies: [],
      Coding: [],
      Finance: []
    };
    setTodos(savedTodos);
  }, []);

  const updateTodos = (category, updatedTodos) => {
    const newTodos = { ...todos, [category]: updatedTodos };
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const handleClose = () => {
    setSelectedCategory(null);
  };

  

  const filteredCards = cardsData.filter(card => card.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className=' p-4 text-center dark:bg-black '>
      <IoIosArrowBack  size={20} className='cursor-pointer' onClick={navigateBack}/>
       <input className="search-bar  mx-auto mb-2  placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-pink-500 focus:ring-pink-500 focus:ring-1 sm:text-sm  dark:bg-black"
         type='text'
         placeholder='Search for Todos.....'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className='flex flex-wrap justify-center'>
      {filteredCards.map((card, index) => (
        <Card key={index} className='m-4 w-80'>
          <CardHeader>
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p></p>
          </CardContent>
          <CardFooter>
            <Button className='mx-auto   ' onClick={() => setSelectedCategory(card.title.slice(2))}>
              Go
            </Button>
          </CardFooter>
        </Card>
      ))}
</div>
      {selectedCategory && (
        <div className='todo-container'>
          <Todolist
            category={selectedCategory}
            todos={todos[selectedCategory]}
            updateTodos={updateTodos}
          />
          <button className='close-btn' onClick={handleClose}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Listoftodo;
