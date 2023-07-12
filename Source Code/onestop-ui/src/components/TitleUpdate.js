/*Citation for this node module for Title Update
5/29/2023
Modeled after React Project from CS290, our own work with help from TA's.*/

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/*Update functionality for Titles entity*/
const TitleUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const oldTitle = location.state;
  const [updatedTitle, setUpdatedTitle] = useState(oldTitle);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTitle((prevTitle) => ({
      ...prevTitle,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle the updated title object
    let URL = "";
    if (process.env.REACT_APP_MODE === "production") {
      URL = process.env.REACT_APP_API_STRING_PRO;
    } else {
      // Build development string at localhost
      URL = process.env.REACT_APP_API_STRING_DEV;
    }
    try {
        const response = await fetch(`${URL}titles/update/${oldTitle.title_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedTitle)
        });
  
        if (response.ok) {
            navigate('/Titles')
        } else {
          throw new Error('Failed to update title.');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while updating the title.');
      }
  };

  return (
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td>title:</td>
            <td>
              <input
                type="text"
                name="title"
                defaultValue={oldTitle.title}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>studio:</td>
            <td>
              <input
                type="text"
                name="studio"
                defaultValue={oldTitle.studio}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>genre:</td>
            <td>
              <input
                type="text"
                name="genre"
                defaultValue={oldTitle.genre}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>releaseDate:</td>
            <td>
            <input type="date" name="releaseDate" onChange={handleChange}
              default={oldTitle.releaseDate}
              min="1950-01-01" max="2025-12-31"></input>
            </td>
          </tr>
          <tr>
            <td>completed:</td>
            <td>
            <select name="completed" onChange={handleChange}>
              <option value='0'></option>
              <option value='1'>Yes</option>
              <option value='0'>No</option>
            </select>
            </td>
          </tr>
          
          <tr>
            <td colSpan="2">
              <button type="submit">Submit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default TitleUpdate;