import React, { useEffect, useState } from 'react';
import axios from 'axios';

import DataItem from './DataItem';
import './App.css';

function App() {
  // getdata();
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState(''); // تغيير اسم المتغير إلى newNote
  const [editingIndex, setEditingIndex] = useState(-1);


  const [data, setData] = useState([]);

  const apiUrl = '//localhost:3000';

  const addNoteToServer = async (note) => {
    try {
      const response = await axios.post(`${apiUrl}/notesAdd`, { note });
      setData((prevData) => [...prevData, response.data]);
      return response.data;
    } catch (error) {
      console.error('Error adding note:', error);
      throw error;
    }
  };


const updateNoteInServer = async (id, note) => {
  try {
    const response = await axios.put(`${apiUrl}/notesUpdate/${id}`, { note });
    console.log(response);
    setData((prevData) => prevData.map((item) => (item._id === id ? response.data : item)));
    return response.data;
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
};
const deleteNoteFromServer = (note) => {
  return axios.delete(`${apiUrl}/notesDelete/${note._id}`);
};


  const fetchData = async () => {
    try {
      const newData = await getdata();
      setData(newData);
    } catch (error) {
      console.error('Error setting data:', error);
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, 500);

    return () => clearInterval(intervalId);
  }, []);




const handleAddNote = () => {
  if (newNote) {
    if (editingIndex !== -1) {
      const updatedNotes = [...data];
      updatedNotes[editingIndex] = newNote;
      setNotes(updatedNotes);
      console.log();
      updateNoteInServer(data[editingIndex]._id, newNote);
      setEditingIndex(-1);
    } else {
      console.log(3333);
      setNotes([...notes, newNote]);
      addNoteToServer(newNote);
    }
    setNewNote('');
  }
};

const editNote = (index) => {
  setNewNote(notes[index]);
  setEditingIndex(index);
};

const handleDeleteNote = (index) => {
  console.log(`index: ${index}`);
  console.log(`notes: ${data}`);
  const updatedNotes = [...data];
  updatedNotes.splice(index, 1);
  deleteNoteFromServer(data[index]);
  setData(updatedNotes);
};



  return (
    <div className="App">
          
      <h1>مفكرة</h1>
      <input
        type="text"
        placeholder="اكتب ملاحظتك هنا"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
      />
      <button onClick={handleAddNote}>{editingIndex !== -1 ? "تعديل ملاحظة" : "إضافة ملاحظة"}</button>
          <ul className="note-list">
      {data.map((note, index) => (
        <li key={index} className="note-item">
          <div className="note-content">
          <DataItem data={note} />
                      {/* <p className="item-number">{index + 1}</p> */}
          </div>
          <div className="note-buttons">
            { <button className="edit-button" onClick={() => editNote(index)}>تعديل</button> }
            <button className="delete-button" onClick={() => handleDeleteNote(index)}>حذف</button>
          </div>
        </li>
      ))}
    </ul>

    </div>
  );
}

export const getdata = () => {
  return axios.get(`//localhost:3000/`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching data:', error);
      return Promise.reject(error);
    });
}
export default App;
