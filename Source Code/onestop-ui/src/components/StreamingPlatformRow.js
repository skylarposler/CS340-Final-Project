/*Citation for this node module for Streaming Platforms Row
5/28/2023
Modeled after React Project from CS290, our own work*/

import React from 'react';
import {MdDeleteForever, MdEdit} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';

/*Individual row for Streaming Platforms table*/
function StreamingPlatformRow({ streamingPlatform, loadStreamingPlatforms}) {
    const navigate = useNavigate()
    const handleDelete = async (streamingPlatform) => {
        try {
            let URL = "";
        if (process.env.REACT_APP_MODE === "production") {
        URL = process.env.REACT_APP_API_STRING_PRO;
        } else {
        // Build development string at localhost
        URL = process.env.REACT_APP_API_STRING_DEV;
        }
          const response = await fetch(`${URL}streamingplatforms/delete/${streamingPlatform.platform_id}`, {
            method: 'DELETE'
          });
    
          if (response.ok) {
            console.log('Streaming platform deleted successfully!');
            loadStreamingPlatforms()
          } else {
            throw new Error('Failed to delete streaming platform.');
          }
        } catch (error) {
          console.error('An error occurred while deleting the streaming platform:', error);
          // Handle the error as needed
        }
      };
    return (
        <tr>
            <td>{streamingPlatform.platform_id}</td>
            <td>{streamingPlatform.platform_name}</td>
            <td>{streamingPlatform.platform_price}</td>
            <td><MdEdit onClick={() => navigate('/StreamingPlatforms/update', {state: streamingPlatform})}/></td>
            <td><MdDeleteForever onClick={() => handleDelete(streamingPlatform)}/> </td>
        </tr>
    );
}

export default StreamingPlatformRow;