/*Citation for this node module for TitleHost Create
6/1/2023
Modeled after React Project from CS290, our own work with help from TA's.*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TitleHostTitles from './Dropdowns/TitleHostTitles';
import TitleHostPlatforms from './Dropdowns/TitleHostPlatforms';

/*Create functionality for Title Host entity*/
export const TitleHostCreate = ( {loadTitleHosts, titles, platforms} ) => {
  const [titlehost, setTitleHost] = useState({
    title: '',
    platformName: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTitleHost((prevTitleHost) => ({
      ...prevTitleHost,
      [name]: value
    }));
  };

  const addTitleHost = async () => {
    let URL = "";
    if (process.env.REACT_APP_MODE === "production") {
      URL = process.env.REACT_APP_API_STRING_PRO;
    } else {
      // Build development string at localhost
      URL = process.env.REACT_APP_API_STRING_DEV;
    }
    const response = await fetch(`${URL}titlehosts-create`, {
      method: 'POST',
      body: JSON.stringify(titlehost),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 201) {
      loadTitleHosts()
    } else {
      alert(`Failed to add titlehost. Status Code = ${response.status}`);
    }

    navigate('/TitleHosts');
  };

  return (
    <>
    <form>
      <label for='title'>Select Title:</label>
      <select name="title" onChange={handleChange}>
      <option value='Default'></option>
      {titles.map((titles, i) => <TitleHostTitles titles={titles}
                    key={i} />)}
      </select>
      <label for='platformName'>Select Platform:</label>
      <select name="platformName" onChange={handleChange}>
      <option value='Default'></option>
      {platforms.map((platforms, i) => <TitleHostPlatforms platforms={platforms}
                    key={i} />)}
      </select>

      <button onClick={addTitleHost}>Add</button>
    </form>
    </>
  );
};

export default TitleHostCreate;