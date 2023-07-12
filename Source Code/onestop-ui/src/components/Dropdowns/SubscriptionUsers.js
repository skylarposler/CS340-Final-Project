/*Citation for Dropdowns 
6/7/2023
OneStopAnime - Made with REACT
Our own work*/

import React from 'react';

/*Maps usernames for Subscriptions dropdown*/

function SusbcriptionUsers({ users }) {

    return (
        <option value={users.user_id}> {users.username}</option>
    );
}

export default SusbcriptionUsers;