/*Citation for this node module for Streaming Platforms
5/31/2023
Modeled after React Project from CS290, our own work.*/

import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {useState, useEffect } from 'react';
import StreamingPlatformTable from '../components/StreamingPlatformTable';
import StreamingPlatformCreate from '../components/StreamingPlatformCreate';

/*Streaming Platforms page*/
function StreamingPlatforms({setStreamingPlatformToEdit}) {
   const [streamingPlatforms, setStreamingPlatforms] = useState([]);


   const navigate = useNavigate()


   const onDelete = async _id => {
    let URL = "";
        if (process.env.REACT_APP_MODE === "production") {
        URL = process.env.REACT_APP_API_STRING_PRO;
        } else {
        // Build development string at localhost
        URL = process.env.REACT_APP_API_STRING_DEV;
        }
       const response = await fetch(`${URL}streamingplatforms/${_id}`, {method: 'DELETE'});
       if(response.status === 204){
           setStreamingPlatforms(streamingPlatforms.filter(streamingplatform => streamingplatform._id !== _id));
       }else{
           console.error(`failed to delete streaming platform with _id=${_id}, status code = ${response.status}`);
       }
   }

   const onEdit = streamingPlatform => {
       setStreamingPlatformToEdit(streamingPlatform);
       navigate(`/edit-streamingplatform`)
   }

   const loadStreamingPlatforms = async () => {
    let URL = "";
        if (process.env.REACT_APP_MODE === "production") {
        URL = process.env.REACT_APP_API_STRING_PRO;
        } else {
        // Build development string at localhost
        URL = process.env.REACT_APP_API_STRING_DEV;
        }
       const response = await fetch(`${URL}StreamingPlatforms`);
       const data = await response.json();
       console.log(data)
       setStreamingPlatforms(data);
   }


   useEffect(() => {
        loadStreamingPlatforms();
   }, []);
   return (
        <>
            <h2>Partnered Streaming Platforms</h2>
            <table id='streamingPlatforms-table'>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Platform Name</th>
                    <th>Price</th>
                </tr>
                </thead>
                <StreamingPlatformTable streamingPlatforms={streamingPlatforms} loadStreamingPlatforms = {loadStreamingPlatforms} />
            </table>
            <h2>Add New Platform</h2>
            <StreamingPlatformCreate loadStreamingPlatforms={loadStreamingPlatforms}/>
        </>
   )
};
export default StreamingPlatforms;