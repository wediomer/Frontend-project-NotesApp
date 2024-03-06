import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const LoadNotes = [];
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || LoadNotes);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showForm, setShowForm] = useState(false);


  useEffect(() => {
    setTimeout(() => {
      
    }, 10000); 
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
      const newNote = {
        id: Date.now().toString(),
        title: title,
        body: content,
        date: moment().format('MMMM Do YYYY, h:mm:ss a'),
        color: 'white',
      };
      setNotes([...notes, newNote]);
      setTitle('');
      setContent('');
      setShowForm(false);
    
  };

 

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const removeNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const changeColor = (id, color) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, color } : note
    );
    setNotes(updatedNotes);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 animate-slide-in ">Notes App</h1>
      {showForm ? (
        <div className="container bg-light mb-4 py-3">
          <h2 className="text-center">Add Note</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title:
              </label>
              <input
                className="form-control"
                type="text"
                id="title"
                placeholder="Title"
                value={title}
                onChange={handleTitleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">
                Content:
              </label>
              <textarea
                className="form-control"
                id="content"
                rows="5"
                placeholder="Content"
                value={content}
                onChange={handleContentChange}
                required
              />
            </div>
            <div className="row">
              <div className="col-6">
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </div>
              <div className="col-6 text-end">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <button className="plus-button mb-3 text-bg-secondary mt-3" onClick={() => setShowForm(true)}>
         
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVswoPEDZxfuSTjv10ZDHO2B27gRm5nR8NIAXFG54FTQRTmACf"
            alt="plus symbol"
          />
         
        </button>
      )}
      <div className="row mb-5">
        {notes.map((note) => (
          <div
            key={note.id}
            className="col-sm-6 col-md-4 col-lg-3 ms-2 mt-2"
            style={{ backgroundColor: note.color }}
          >
            <div className="note p-3">
              <h3 className="mb-2" style={{ wordWrap: 'break-word' }}>
                {note.title}
              </h3>
              <p className="mb-2" style={{ wordWrap: 'break-word' }}>
                {note.body}
              </p>
              <p className="fade-animation">Created: {note.date}</p>

              <button
                className="btn btn-danger"
                onClick={() => removeNote(note.id)}
              >
                Remove
              </button>
              <div className="color-picker mt-2">
                <span>Color:</span>
                <button
                  class="btn btn-outline-light"
                  onClick={() => changeColor(note.id, 'white')}
                ></button>
                <button
                  class="btn btn-outline-warning"
                  onClick={() => changeColor(note.id, 'yellow')}
                ></button>
                  <button
                  class="btn btn-outline-primary"
                  onClick={() => changeColor(note.id, 'blue')}
                ></button>
                <button
                  class="btn btn-outline-danger"
                  onClick={() => changeColor(note.id, 'red')}
                ></button>
                <button
                   class="btn btn-outline-success"
                  onClick={() => changeColor(note.id, 'green')}
                ></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;