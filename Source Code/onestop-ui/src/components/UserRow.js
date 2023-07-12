/*Citation for this node module for User Row
5/27/2023
Modeled after React Project from CS290, our own work.*/

import React from 'react';
import {MdDeleteForever, MdEdit} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';

/*Individual row for Users table*/
function UserRow({ user, loadUsers}) {
    const navigate = useNavigate()
    const handleDelete = async (user) => {
      let URL = "";
      if (process.env.REACT_APP_MODE === "production") {
      URL = process.env.REACT_APP_API_STRING_PRO;
      } else {
      // Build development string at localhost
      URL = process.env.REACT_APP_API_STRING_DEV;
      }
        try {
          const response = await fetch(`${URL}users/delete/${user.user_id}`, {
            method: 'DELETE'
          });
    
          if (response.ok) {
            console.log('User deleted successfully!');
            loadUsers()
          } else {
            throw new Error('Failed to delete user.');
          }
        } catch (error) {
          console.error('An error occurred while deleting the user:', error);
          // Handle the error as needed
        }
      };
    return (
        <tr>
            <td>{user.user_id}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.street_address}</td>
            <td>{user.city}</td>
            <td>{user.state}</td>
            <td>{user.postal_code}</td>
            <td>{user.email}</td>
            <td>{user.username}</td>
            <td><MdEdit onClick={() => navigate('/Users/update', {state: user})}/></td>
            <td><MdDeleteForever onClick={() => handleDelete(user)}/> </td>
        </tr>
    );
}

export default UserRow;