/*Citation for this node module for TitleHost
6/2/2023
Modeled after React Project from CS290, our own work.*/

import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {useState, useEffect } from 'react';
import TitleHostTable from '../components/TitleHostTable';
import TitleHostCreate from '../components/TitleHostCreate';

/*TitleHosts Page*/
function TitleHosts({setTitleHostToEdit}) {
   const [titlehosts, setTitleHosts] = useState([]);
   const [titles, setTitles] = useState([]);
   const [platforms, setPlatforms] = useState([]);
   const navigate = useNavigate()


   const onDelete = async _id => {
    let URL = "";
    if (process.env.REACT_APP_MODE === "production") {
      URL = process.env.REACT_APP_API_STRING_PRO;
    } else {
      // Build development string at localhost
      URL = process.env.REACT_APP_API_STRING_DEV;
    }
       const response = await fetch(`${URL}titlehosts/${_id}`, {method: 'DELETE'});
       if(response.status === 204){
           setTitleHosts(titlehosts.filter(titlehost => titlehosts._id !== _id));
       }else{
           console.error(`failed to delete titlehost with _id=${_id}, status code = ${response.status}`);
       }


   }

   const onEdit = titlehost => {
       setTitleHostToEdit(titlehost);
       navigate(`/edit-titlehost`)
   }


   const loadTitleHosts = async () => {
        let URL = "";
        if (process.env.REACT_APP_MODE === "production") {
        URL = process.env.REACT_APP_API_STRING_PRO;
        } else {
        // Build development string at localhost
        URL = process.env.REACT_APP_API_STRING_DEV;
        }
       const response = await fetch(`${URL}TitleHosts`);
       const data = await response.json();
       setTitleHosts(data);
       console.log(data)
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
   const loadPlatforms = async () => {
    let URL = "";
        if (process.env.REACT_APP_MODE === "production") {
        URL = process.env.REACT_APP_API_STRING_PRO;
        } else {
        // Build development string at localhost
        URL = process.env.REACT_APP_API_STRING_DEV;
        }
       const response = await fetch(`${URL}StreamingPlatforms`);
       const data = await response.json();
       setPlatforms(data);
   }
   


   useEffect(() => {
        loadPlatforms();
        loadTitles();
        loadTitleHosts();
   }, []);
   return (
        <>
            <h2>TitleHosts Library</h2>
            <table id='titlehosts-table'>
                <thead>
                <tr>
                    <th>TitleHost ID</th>
                    <th>Title ID</th>
                    <th>Title</th>
                    <th>Platform ID</th>
                    <th>Platform</th>
                </tr>
                </thead>
                <TitleHostTable titlehosts={titlehosts} loadTitleHosts = {loadTitleHosts} />
            </table>
            <h2>Add New TitleHost</h2>
            <TitleHostCreate loadTitleHosts={loadTitleHosts}  titles={titles} platforms={platforms}/>
        </>
   )
};
export default TitleHosts;
