/*Citation for this node module for Title Create
5/31/2023
Modeled after React Project from CS290, our own work with help from TA's*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/*Create functionality for Titles entity*/
export const TitleCreate = ( {loadTitles} ) => {
  const [title, setTitle] = useState({
    title: '',
    studio: '',
    genre: '',
    releaseDate: '',
    completed: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTitle((prevTitle) => ({
      ...prevTitle,
      [name]: value
    }));
  };

  const addTitle = async () => {
    let URL = "";
    if (process.env.REACT_APP_MODE === "production") {
      URL = process.env.REACT_APP_API_STRING_PRO;
    } else {
      // Build development string at localhost
      URL = process.env.REACT_APP_API_STRING_DEV;
    }
    const response = await fetch(`${URL}titles-create`, {
      method: 'POST',
      body: JSON.stringify(title),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 201) {
      loadTitles()
    } else {
      alert(`Failed to add title. Status Code = ${response.status}`);
    }

    navigate('/Titles');
  };

  return (
    <>
    <form>
      <label>Title:</label>
      <input
        type="text"
        placeholder="Enter title here"
        name="title"
        value={title.title}
        onChange={handleChange}
      />
      <label>Studio:</label>
      <input
        type="text"
        placeholder="Enter studio here"
        name="studio"
        value={title.studio}
        onChange={handleChange}
      />
      <label>Genre:</label>
      <input
        type="text"
        placeholder="Enter genre here"
        name="genre"
        value={title.genre}
        onChange={handleChange}
      />
      <label>Release Date:</label>
      <input type="date" name="releaseDate" onChange={handleChange}
        min="1950-01-01" max="2025-12-31"></input>

      <label for='completed'>Completed:</label>
      <select name="completed" onChange={handleChange}>
        <option value='0'></option>
        <option value='1'>Yes</option>
        <option value='0'>No</option>
      </select>
      <button onClick={addTitle}>Add</button>
      </form>
    </>
  );
};

export default TitleCreate;