/*Citation for this node module  Subscription Create
6/4/2023
Modeled after React Project from CS290, our own work with help from TA's*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubscriptionUsers from './Dropdowns/SubscriptionUsers';
import SubscriptionPlatforms from './Dropdowns/SubscriptionPlatforms';

/*Create functionality for Subscriptions entity*/
export const SubscriptionCreate = ( {loadSubscriptions, users, platforms} ) => {
  const [subscription, setSubscription] = useState({
    userID: '',
    platformID: '',
    sub_start_date:''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubscription((prevSubscription) => ({
      ...prevSubscription,
      [name]: value
    }));
  };

  const addSubscription = async () => {
    let URL = "";
    if (process.env.REACT_APP_MODE === "production") {
      URL = process.env.REACT_APP_API_STRING_PRO;
    } else {
      // Build development string at localhost
      URL = process.env.REACT_APP_API_STRING_DEV;
    }
    const response = await fetch(`${URL}subscription-create`, {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 201) {
      loadSubscriptions()
    } else {
      alert(`Failed to add subscription. Status Code = ${response.status}`);
    }

    navigate('/Subscriptions');
  };



  return (
    <>
    <form>
      <label for='userID'>Select Username:</label>
      <select name="userID" onChange={handleChange}>
      <option value='Default'></option>
      {users.map((users, i) => <SubscriptionUsers users={users}
                    key={i} />)}
      </select>
      <label for='platformID'>Select Platform:</label>
      <select name="platformID" onChange={handleChange}>
      <option value='Default'></option>
      {platforms.map((platforms, i) => <SubscriptionPlatforms platforms={platforms}
                    key={i} />)}
      </select>
      <label for="start">Start date:</label>

      <input type="date" name="sub_start_date" onChange={handleChange}
        min="1950-01-01" max="2025-12-31"></input>

      <button onClick={addSubscription}>Add</button>
    </form>
    </>
  );
};

export default SubscriptionCreate;