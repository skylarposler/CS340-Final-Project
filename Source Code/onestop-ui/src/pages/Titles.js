/*Citation for this node module for Titles
5/31/2023
Modeled after React Project from CS290, our own work.*/

import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {useState, useEffect } from 'react';
import TitleTable from '../components/TitleTable';
import TitleCreate from '../components/TitleCreate';

/*Titles page*/
function Titles({setTitleToEdit}) {
   const [titles, setTitles] = useState([]);
   const navigate = useNavigate()


   const onDelete = async _id => {
    let URL = "";
    if (process.env.REACT_APP_MODE === "production") {
      URL = process.env.REACT_APP_API_STRING_PRO;
    } else {
      // Build development string at localhost
      URL = process.env.REACT_APP_API_STRING_DEV;
    }
       const response = await fetch(`${URL}titles/${_id}`, {method: 'DELETE'});
       if(response.status === 204){
           setTitles(titles.filter(title => titles._id !== _id));
       }else{
           console.error(`failed to delete title with _id=${_id}, status code = ${response.status}`);
       }


   }

   const onEdit = title => {
       setTitleToEdit(title);
       navigate(`/edit-title`)
   }


   const loadTitles = async () => {
        let URL = "";
        if (process.env.REACT_APP_MODE === "production") {
        URL = process.env.REACT_APP_API_STRING_PRO;
        } else {
        // Build development string at localhost
        URL = process.env.REACT_APP_API_STRING_DEV;
        }
       const response = await fetch(`${URL}Titles`);
       const data = await response.json();
       setTitles(data);
   }
   


   useEffect(() => {
       loadTitles();
   }, []);
   return (
        <>
            <h2>Titles Library</h2>
            <table id='titles-table'>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Studio</th>
                    <th>Genre</th>
                    <th>Release Date</th>
                    <th>Completed</th>
                </tr>
                </thead>
                <TitleTable titles={titles} loadTitles = {loadTitles} />
            </table>
            <h2>Add New Title</h2>
            <TitleCreate loadTitles={loadTitles}/>
        </>
   )
};
export default Titles;
