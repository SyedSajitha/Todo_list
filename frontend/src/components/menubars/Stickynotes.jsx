import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import './notes.css';

const Stickynotes = () => {
  const [inputText, setInputText] = useState('');
  const [notes, setNotes] = useState([]);
  const [editToggle, setEditToggle] = useState(null);

  const editHandler = (id, text) => {
    setEditToggle(id);
    setInputText(text);
  };

  const saveHandler = () => {
    if (editToggle) {
      setNotes(notes.map((note) =>
        note.id === editToggle
          ? { ...note, text: inputText }
          : note
      ));
    } else {
      setNotes((prevNotes) => [
        ...prevNotes,
        {
          id: uuid(),
          text: inputText,
        },
      ]);
    }

    setInputText('');
    setEditToggle(null);
  };

  const deleteHandler = (id) => {
    const newNotes = notes.filter(n => n.id !== id);
    setNotes(newNotes);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('Notes'));
    if (data) {
      setNotes(data);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('Notes', JSON.stringify(notes));
  }, [notes]);

  const CreateNote = ({ inputText, setInputText, saveHandler }) => {
    const words = inputText.trim().split(/\s+/).filter(word => word !== '');
    const wordLimit = 100 - words.length;

    const handleInputChange = (e) => {
      const text = e.target.value;
      const wordCount = text.trim().split(/\s+/).filter(word => word !== '').length;
      if (wordCount <= 100) {
        setInputText(text);
      }
    };

    return (
      <div className='note'>
        <textarea
          cols={10}
          rows={5}
          placeholder='Type...'
          value={inputText}
          onChange={handleInputChange}
        />
        <div className='note_footer'>
          <span className='label'>{wordLimit} Words Left</span>
          <button className='note_save' onClick={saveHandler}>Save</button>
        </div>
      </div>
    );
  };

  const Note = ({ id, text, editHandler, deleteHandler }) => {
    return (
      <div className='note'>
        <div className='note-body'>{text}</div>
        <div className='note_footer' style={{ justifyContent: 'flex-end' }}>
          <button className='note_save' onClick={() => deleteHandler(id)}>Delete</button> &nbsp;
          <button className='note_save' onClick={() => editHandler(id, text)}>Edit</button>
        </div>
      </div>
    );
  };

  return (
    <div className='notes'>
      {
        notes.map((note) =>
          editToggle === note.id
            ? <CreateNote
              inputText={inputText}
              setInputText={setInputText}
              saveHandler={saveHandler}
              key={note.id}
            />
            : <Note
              key={note.id}
              id={note.id}
              text={note.text}
              editHandler={editHandler}
              deleteHandler={deleteHandler}
            />
        )
      }
      {
        editToggle === null &&
        <CreateNote
          inputText={inputText}
          setInputText={setInputText}
          saveHandler={saveHandler}
        />
      }
    </div>
  );
};

export default Stickynotes;