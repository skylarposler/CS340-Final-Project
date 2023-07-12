/*Citation for this node module for TitleHost Update
6/2/2023
Modeled after React Project from CS290, our own work with help from TA's*/

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TitleHostPlatforms from './Dropdowns/TitleHostPlatforms';

/*Update functionality for Title Host entity*/
const TitleHostUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const oldTitleHost = location.state;
  const [updatedTitleHost, setUpdatedTitleHost] = useState(oldTitleHost);
  const [platforms, setPlatforms] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTitleHost((prevTitleHost) => ({
      ...prevTitleHost,
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
        const response = await fetch(`${URL}titlehost/update/${oldTitleHost.title_host_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedTitleHost)
        });
  
        if (response.ok) {
            navigate('/TitleHosts')
        } else {
          throw new Error('Failed to update title host.');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while updating the title host.');
      }
  };

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
}, []);

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td>Title Host ID:</td>
            <td>
            <p>{oldTitleHost.title_host_id}</p>
            </td>
          </tr>
          <tr>
            <td>Title:</td>
            <td>
            <p>{oldTitleHost.title}</p>
            </td>
          </tr>
          <tr>
            <td>Platform: </td>
            <td>
            <select name="platform_name" onChange={handleChange}>
              <option value="" ></option>
              <option value='NULL'>None</option>
                {platforms.map((platforms, i) => <TitleHostPlatforms platforms={platforms}
                    key={i} />)}
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
    </div>
  );
};

export default TitleHostUpdate;