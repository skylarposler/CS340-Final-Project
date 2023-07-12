/*Citation for this node module for User Create
5/20/2023
Modeled after React Project from CS290, our own work with help from TA's*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/*Create for Users entity*/
export const UserCreate = ( {loadUsers} ) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    email: '',
    username: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const addUser = async () => {
    let URL = "";
    if (process.env.REACT_APP_MODE === "production") {
      URL = process.env.REACT_APP_API_STRING_PRO;
    } else {
      // Build development string at localhost
      URL = process.env.REACT_APP_API_STRING_DEV;
    }
    const response = await fetch(`${URL}users-create`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 201) {
      loadUsers()
    } else {
      alert(`Failed to add user. Status Code = ${response.status}`);
    }

    navigate('/Users');
  };

  return (
    <>
    <form>
      <label>First Name:</label>
      <input
        type="text"
        placeholder="Enter first name here"
        name="firstName"
        value={user.firstName}
        onChange={handleChange}
      />
      <label>Last Name:</label>
      <input
        type="text"
        placeholder="Enter last name here"
        name="lastName"
        value={user.lastName}
        onChange={handleChange}
      />
      <label>Street Address:</label>
      <input
        type="text"
        placeholder="Enter street address here"
        name="streetAddress"
        value={user.streetAddress}
        onChange={handleChange}
      />
      <label>City:</label>
      <input
        type="text"
        placeholder="Enter city here"
        name="city"
        value={user.city}
        onChange={handleChange}
      />
      <label>State:</label>
      <input
        type="text"
        placeholder="Enter state here"
        name="state"
        value={user.state}
        onChange={handleChange}
      />
      <label>Postal Code:</label>
      <input
        type="text"
        placeholder="Enter postal code here"
        name="postalCode"
        value={user.postalCode}
        onChange={handleChange}
      />
      <label>Email:</label>
      <input
        type="text"
        placeholder="Enter email here"
        name="email"
        value={user.email}
        onChange={handleChange}
      />
      <label>Username:</label>
      <input
        type="text"
        placeholder="Enter username here"
        name="username"
        value={user.username}
        onChange={handleChange}
      />
      <button onClick={addUser}>Add</button>
      </form>
    </>
  );
};

export default UserCreate;