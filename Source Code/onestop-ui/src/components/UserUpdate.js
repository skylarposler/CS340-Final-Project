/*Citation for Update Function for Users
5/25/2023
Modeled after React Project from CS290, our own work with help from TA's*/

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/*Update functionality for Users table*/
const UserUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const oldUser = location.state;
  const [updatedUser, setUpdatedUser] = useState(oldUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle the updated user object

    let URL = "";
    if (process.env.REACT_APP_MODE === "production") {
      URL = process.env.REACT_APP_API_STRING_PRO;
    } else {
      // Build development string at localhost
      URL = process.env.REACT_APP_API_STRING_DEV;
    }
    try {
        const response = await fetch(`${URL}users/update/${oldUser.user_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedUser)
        });
  
        if (response.ok) {
            navigate('/Users')
        } else {
          throw new Error('Failed to update user.');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while updating the user.');
      }
  };
  return (
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td>First Name:</td>
            <td>
              <input
                type="text"
                name="first_name"
                defaultValue={oldUser.first_name}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Last Name:</td>
            <td>
              <input
                type="text"
                name="last_name"
                defaultValue={oldUser.last_name}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Street Address:</td>
            <td>
              <input
                type="text"
                name="street_address"
                defaultValue={oldUser.street_address}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>City:</td>
            <td>
              <input
                type="text"
                name="city"
                defaultValue={oldUser.city}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>State:</td>
            <td>
              <input
                type="text"
                name="state"
                defaultValue={oldUser.state}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Postal Code:</td>
            <td>
              <input
                type="text"
                name="postal_code"
                defaultValue={oldUser.postal_code}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>
              <input
                type="text"
                name="email"
                defaultValue={oldUser.email}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Username:</td>
            <td>
              <input
                type="text"
                name="username"
                defaultValue={oldUser.username}
                onChange={handleChange}
              />
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
  );
};

export default UserUpdate;