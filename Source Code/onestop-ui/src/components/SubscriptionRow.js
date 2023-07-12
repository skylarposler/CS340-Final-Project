/*Citation for this node module for Subscriptions Row
6/4/2023
Modeled after React Project from CS290, our own work.*/

import React from 'react';
import {MdDeleteForever, MdEdit} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';

/*Individual row for Subscriptions table*/
function SubscriptionsRow({ subscription, loadSubscriptions}) {
    const navigate = useNavigate()
    const handleDelete = async (subscription) => {
      let URL = "";
      if (process.env.REACT_APP_MODE === "production") {
        URL = process.env.REACT_APP_API_STRING_PRO;
      } else {
        // Build development string at localhost
        URL = process.env.REACT_APP_API_STRING_DEV;
      }
        try {
          const response = await fetch(`${URL}subscriptions/delete/${subscription.subscription_id}`, {
            method: 'DELETE'
          });
    
          if (response.ok) {
            console.log('Subscription deleted successfully!');
            loadSubscriptions()
          } else {
            throw new Error('Failed to delete subscription.');
          }
        } catch (error) {
          console.error('An error occurred while deleting the subscription:', error);
          // Handle the error as needed
        }
      };
      
    return (
        <tr>
            <td>{subscription.subscription_id}</td>
            <td>{subscription.user_id}</td>
            <td>{subscription.username}</td>
            <td>{subscription.platform_id}</td>
            <td>{subscription.platform_name}</td>
            <td>{subscription.sub_start}</td>
            <td><MdDeleteForever onClick={() => handleDelete(subscription)}/> </td>
        </tr>
    );
}

export default SubscriptionsRow;