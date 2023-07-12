/*Citation for this node module for Title Row
5/31/2023
Modeled after React Project from CS290, our own work.*/

import React from 'react';
import {MdDeleteForever, MdEdit} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';

/*Indivdual row for Titles table*/
function TitleRow({ title, loadTitles}) {
    const navigate = useNavigate()
    const handleDelete = async (title) => {
      let URL = "";
      if (process.env.REACT_APP_MODE === "production") {
        URL = process.env.REACT_APP_API_STRING_PRO;
      } else {
        // Build development string at localhost
        URL = process.env.REACT_APP_API_STRING_DEV;
      }
        try {
          const response = await fetch(`${URL}titles/delete/${title.title_id}`, {
            method: 'DELETE'
          });
    
          if (response.ok) {
            console.log('Title deleted successfully!');
            loadTitles()
          } else {
            throw new Error('Failed to delete title.');
          }
        } catch (error) {
          console.error('An error occurred while deleting the title:', error);
          // Handle the error as needed
        }
      };


      function convertBool(completedBool){
        if (completedBool){
          return 'Yes'
        }
        return 'No'
      }
    return (
        <tr>
            <td>{title.title_id}</td>
            <td>{title.title}</td>
            <td>{title.studio}</td>
            <td>{title.genre}</td>
            <td>{title.releaseDate}</td>
            <td>{convertBool(title.completed)}</td>
            <td><MdEdit onClick={() => navigate('/Titles/update', {state: title})}/></td>
            <td><MdDeleteForever onClick={() => handleDelete(title)}/> </td>
        </tr>
    );
}

export default TitleRow;