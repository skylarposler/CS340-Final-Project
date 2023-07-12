/*Citation for node module Streaming Platforms Update
6/1/2023
Modeled after React Project from CS290, our own work with help from TA's*/

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/*Update functionality for Streaming Platforms entity*/
const StreamingPlatformUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const oldStreamingPlatform = location.state;
  const [updatedStreamingPlatform, setUpdatedStreamingPlatform] = useState(oldStreamingPlatform);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStreamingPlatform((prevStreamingPlatform) => ({
      ...prevStreamingPlatform,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    // Handle the updated title object
    let URL = "";
        if (process.env.REACT_APP_MODE === "production") {
        URL = process.env.REACT_APP_API_STRING_PRO;
        } else {
        // Build development string at localhost
        URL = process.env.REACT_APP_API_STRING_DEV;
    }
    try {
        const response = await fetch(`${URL}streamingplatforms/update/${oldStreamingPlatform.platform_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedStreamingPlatform)
        });
  
        if (response.ok) {
            navigate('/StreamingPlatforms')
        } else {
          throw new Error('Failed to update streaming platform.');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while updating the streaming platform.');
      }
  };
  return (
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td>Platform Name:</td>
            <td>
              <input
                type="text"
                name="platformName"
                defaultValue={oldStreamingPlatform.platform_name}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Platform Price:</td>
            <td>
              <input
                type="text"
                name="platformPrice"
                defaultValue={oldStreamingPlatform.platform_price}
                onChange={handleChange}
              />
            </td>
            <td colSpan="2">
              <button type="submit">Submit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default StreamingPlatformUpdate;