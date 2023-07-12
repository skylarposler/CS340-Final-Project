/*Citation for this node module for Subscriptions
6/7/2023
Modeled after React Project from CS290, our own work with help from TA's.*/

import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {useState, useEffect } from 'react';
import SubscriptionTable from '../components/SubscriptionTable';
import SubscriptionCreate from '../components/SubscriptionCreate';

/*Subscriptions page*/
function Subscriptions({setSubscriptionToEdit}) {
   const [subscriptions, setSubscriptions] = useState([]);
   const [users, setUsers] = useState([]);
   const [platforms, setPlatforms] = useState([]);
   const navigate = useNavigate()


   const onDelete = async _id => {
    let URL = "";
    if (process.env.REACT_APP_MODE === "production") {
      URL = process.env.REACT_APP_API_STRING_PRO;
    } else {
      // Build development string at localhost
      URL = process.env.REACT_APP_API_STRING_DEV;
    }
       const response = await fetch(`${URL}subscriptions/${_id}`, {method: 'DELETE'});
       if(response.status === 204){
           setSubscriptions(subscriptions.filter(subscriptions => subscriptions._id !== _id));
       }else{
           console.error(`failed to delete subscription with _id=${_id}, status code = ${response.status}`);
       }


   }

   const onEdit = subscription => {
       setSubscriptionToEdit(subscription);
       navigate(`/edit-subscription`)
   }


   const loadSubscriptions = async () => {
        let URL = "";
        if (process.env.REACT_APP_MODE === "production") {
        URL = process.env.REACT_APP_API_STRING_PRO;
        } else {
        // Build development string at localhost
        URL = process.env.REACT_APP_API_STRING_DEV;
        }
       const response = await fetch(`${URL}Subscriptions`);
       const data = await response.json();
       setSubscriptions(data);
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
}

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
       loadSubscriptions();
       loadUsers();
       loadPlatforms();
   }, []);
   return (
        <>
            <h2>Active Subscriptions</h2>
            <table id='subscriptions-table'>
                <thead>
                <tr>
                    <th>Subscription ID</th>
                    <th>User ID</th>
                    <th>Username</th>
                    <th>Platform ID</th>
                    <th>Platform</th>
                    <th>Start Date</th>
                </tr>
                </thead>
                <SubscriptionTable subscriptions={subscriptions} loadSubscriptions = {loadSubscriptions} />
            </table>
            <h2>Add New Subscription</h2>
            <SubscriptionCreate loadSubscriptions={loadSubscriptions} users={users} platforms={platforms}/>
        </>
   )
};
export default Subscriptions;