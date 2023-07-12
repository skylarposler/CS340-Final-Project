/*Citation for this node module for Users
5/25/2023
Modeled after React Project from CS290, our own work.*/

import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {useState, useEffect } from 'react';
import UserTable from '../components/UserTable';
import UserCreate from '../components/UserCreate';

/*Users page*/
function Users({setUserToEdit}) {
   const [users, setUsers] = useState([]);
   const navigate = useNavigate()

   // Citation for the following function:
   // Date: 5/17/2023
   // Adapted from CS290:
   const onDelete = async _id => {
    let URL = "";
    if (process.env.REACT_APP_MODE === "production") {
      URL = process.env.REACT_APP_API_STRING_PRO;
    } else {
      // Build development string at localhost
      URL = process.env.REACT_APP_API_STRING_DEV;
    }
       const response = await fetch(`${URL}users/${_id}`, {method: 'DELETE'});
       if(response.status === 204){
           setUsers(users.filter(user => user._id !== _id));
       }else{
           console.error(`failed to delete user with _id=${_id}, status code = ${response.status}`);
       }


   }


   const onEdit = user => {
       setUserToEdit(users);
       navigate(`/edit-user`)
   }

   const loadUsers = async () => {
        let URL = "";
        if (process.env.REACT_APP_MODE === "production") {
        URL = process.env.REACT_APP_API_STRING_PRO;
        } else {
        // Build development string at localhost
        URL = process.env.REACT_APP_API_STRING_DEV;
        }
       const response = await fetch(`${URL}Users`);
       const data = await response.json();
       setUsers(data);
   } // loads users and saves them to users
   
   useEffect(() => {
       loadUsers();
   }, []);
   return (
        <>
            <h2>Users Library</h2>
            <table id='users-table'>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Postal Code</th>
                    <th>Email</th>
                    <th>Username</th>
                </tr>
                </thead>
                <UserTable users={users} loadUsers = {loadUsers} />
            </table>
            <h2>Add New User</h2>
            <UserCreate loadUsers={loadUsers}/>
        </>
   )
};
export default Users;
