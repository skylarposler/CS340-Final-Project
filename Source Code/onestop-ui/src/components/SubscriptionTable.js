/*Citation for this node module for Subscriptions Table
6/4/2023
Modeled after React Project from CS290, our own work.*/

import React from 'react';
import SubscriptionRow from './SubscriptionRow';

/*Table for Subscription entity*/
function SubscriptionTable({ subscriptions, loadSubscriptions }) {
    return (
            <tbody>
                {subscriptions.map((subscription, i) => <SubscriptionRow subscription={subscription} loadSubscriptions={loadSubscriptions}
                    key={i} />)}
            </tbody>
    );
}

export default SubscriptionTable;