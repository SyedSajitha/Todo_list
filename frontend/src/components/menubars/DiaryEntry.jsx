import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";

const DiaryEntry = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [diaryEntries, setDiaryEntries] = useState({});

  // Load diary entries from localStorage when the component mounts
  useEffect(() => {
    const storedEntries = localStorage.getItem('diaryEntries');
    if (storedEntries) {
      setDiaryEntries(JSON.parse(storedEntries));
    }
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleDiaryChange = (event) => {
    const newEntries = { ...diaryEntries, [selectedDate.toDateString()]: event.target.value };
    setDiaryEntries(newEntries);
  };

  const handleSubmit = () => {
    // Save the current diary entry to localStorage
    localStorage.setItem('diaryEntries', JSON.stringify(diaryEntries));
    console.log("Diary Entry Submitted:", selectedDate.toDateString(), diaryEntries[selectedDate.toDateString()]);
    alert('Diary entry submitted!');
  };

  const navigate = useNavigate();
  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 dark:bg-black">
      <IoIosArrowBack  size={20} className='cursor-pointer mt-0 pt-0' onClick={navigateBack}/>
      <h1 className="text-3xl font-bold mb-8">Daily Diary</h1>
      <div className="flex flex-row space-x-8">
        <div className="flex-shrink-0">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            placeholderText="Select a date"
            inline
            className=''
          />
        </div>
        {selectedDate && (
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl">{selectedDate.toDateString()}</h2>
            <textarea
              rows="10"
              cols="50"
              value={diaryEntries[selectedDate.toDateString()] || ''}
              onChange={handleDiaryChange}
              className="w-full p-2 border border-gray-300 rounded resize-both focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
            />
            <button
              onClick={handleSubmit}
              className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiaryEntry