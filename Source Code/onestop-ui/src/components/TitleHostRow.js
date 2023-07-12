/*Citation for this node module for TitleHost Row
5/31/2023
Modeled after React Project from CS290, our own work.*/

import React from 'react';
import {MdDeleteForever, MdEdit} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';

/*Individual row for Title Host table*/
function TitleHostRow({ titlehost, loadTitleHosts}) {
    const navigate = useNavigate()
    const handleDelete = async (titlehost) => {
      let URL = "";
      if (process.env.REACT_APP_MODE === "production") {
        URL = process.env.REACT_APP_API_STRING_PRO;
      } else {
        // Build development string at localhost
        URL = process.env.REACT_APP_API_STRING_DEV;
      }
        try {
          const response = await fetch(`${URL}titlehosts/delete/${titlehost.title_host_id}`, {
            method: 'DELETE'
          });
    
          if (response.ok) {
            console.log('TitleHost deleted successfully!');
            loadTitleHosts()
          } else {
            throw new Error('Failed to delete titlehost.');
          }
        } catch (error) {
          console.error('An error occurred while deleting the titlehost:', error);
          // Handle the error as needed
        }
      };
    return (
        <tr>
            <td>{titlehost.title_host_id}</td>
            <td>{titlehost.title_id}</td>
            <td>{titlehost.title}</td>
            <td>{titlehost.platform_id}</td>
            <td>{titlehost.platform_name}</td>
            <td><MdEdit onClick={() => navigate('/TitleHosts/update', {state: titlehost})}/></td>
            <td><MdDeleteForever onClick={() => handleDelete(titlehost)}/> </td>
        </tr>
    );
}

export default TitleHostRow;