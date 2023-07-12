/*Citation for this node module for Streaming Platforms Create
6/1/2023
Modeled after React Project from CS290, our own work with help from TA's*/

/*Create functionality for Streaming Platforms table*/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const StreamingPlatformCreate = ( {loadStreamingPlatforms} ) => {
  const [streamingPlatform, setStreamingPlatform] = useState({
    platformName: '',
    platformPrice: '',
  });

  const navigate = useNavigate();

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStreamingPlatform((prevStreamingPlatform) => ({
      ...prevStreamingPlatform,
      [name]: value
    }));
  };

  const addStreamingPlatform = async () => {
    let URL = "";
        if (process.env.REACT_APP_MODE === "production") {
        URL = process.env.REACT_APP_API_STRING_PRO;
        } else {
        // Build development string at localhost
        URL = process.env.REACT_APP_API_STRING_DEV;
        }
    const response = await fetch(`${URL}streamingplatform-create`, {
      method: 'POST',
      body: JSON.stringify(streamingPlatform),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 201) {
      loadStreamingPlatforms()
    } else {
      alert(`Failed to add streaming platform. Status Code = ${response.status}`);
    }

    navigate('/StreamingPlatforms');
  };

  return (
    <>
    <form>
      <label>Platform Name:</label>
      <input
        type="text"
        placeholder="Enter platform name"
        name="platformName"
        value={streamingPlatform.platformName}
        onChange={handleChange}
      />
      <label>Platform Price:</label>
      <input
        type="text"
        placeholder="Enter price"
        name="platformPrice"
        value={streamingPlatform.platformPrice}
        onChange={handleChange}
      />
      <button onClick={addStreamingPlatform}>Add</button>
      </form>
    </>
  );
};

export default StreamingPlatformCreate;