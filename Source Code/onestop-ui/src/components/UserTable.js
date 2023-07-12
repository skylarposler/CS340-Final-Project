/*Citation for this node module for User Table
5/23/2023
Modeled after React Project from CS290, our own work.*/

import React from 'react';
import UserRow from './UserRow';

/*Table for Users entity*/
function UserTable({ users, loadUsers }) {
    return (
            <tbody>
                {users.map((user, i) => <UserRow user={user} loadUsers={loadUsers}
                    key={i} />)}
            </tbody>
    );
}

export default UserTable;