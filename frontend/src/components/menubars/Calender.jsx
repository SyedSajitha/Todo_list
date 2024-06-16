// Calendar.jsx
import { IoIosArrowBack } from "react-icons/io";
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import Calendar's stylesheet
import './calender.css'; // Your custom styles
import { useNavigate } from 'react-router-dom';

const Calender = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventText, setEventText] = useState('');

  const navigate = useNavigate();
  const navigateBack = () => {
    navigate(-1);
  };


  useEffect(() => {
    // Load events from localStorage on component mount
    const storedEvents = JSON.parse(localStorage.getItem('events')) || {};
    setEvents(storedEvents);
  }, []);

  const saveEventsToLocalStorage = (events) => {
    // Save events to localStorage
    localStorage.setItem('events', JSON.stringify(events));
  };

  const handleDateClick = (date) => {
    // Set selected date and event text for the date
    setSelectedDate(date);
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    setEventText(events[formattedDate] || ''); // Load existing event text if any
  };

  const handleEventChange = (event) => {
    setEventText(event.target.value);
  };

  const handleSaveEvent = () => {
    // Save event text for the selected date
    if (selectedDate) {
      const formattedDate = `${selectedDate.getDate()}-${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`;
      const updatedEvents = { ...events, [formattedDate]: eventText };
      setEvents(updatedEvents);
      saveEventsToLocalStorage(updatedEvents); // Update localStorage
    }
  };

  const handleDeleteEvent = () => {
    // Delete event for the selected date
    if (selectedDate) {
      const formattedDate = `${selectedDate.getDate()}-${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`;
      const updatedEvents = { ...events };
      delete updatedEvents[formattedDate];
      setEvents(updatedEvents);
      saveEventsToLocalStorage(updatedEvents); // Update localStorage
      setSelectedDate(null);
      setEventText('');
    }
  };

  return (
    <div className="calendar-container p-4  ">
      <IoIosArrowBack  size={20} className='cursor-pointer' onClick={navigateBack}/>
      <div className="calendar">
        <Calendar
          onChange={setDate}
          value={date}
          onClickDay={(date) => handleDateClick(date)}
          tileClassName={({ date }) =>
            events[`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`]
              ? 'event-date'
              : null
          }
        />
      </div>
      {selectedDate && (
        <div className="event-details">
          <p>Selected Date: {selectedDate.toDateString()}</p>
          <textarea
            value={eventText}
            onChange={handleEventChange}
            placeholder="Add your event details..."
            className="event-textarea"
          />
          <div className="button-container flex flex-row space-x-1 justify-center">
            <button className="action-btn" onClick={handleSaveEvent}>
              Save 
            </button>
            <button className="action-btn" onClick={handleDeleteEvent}>
              Delete 
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calender