/*Citation for this node module for TitleHost Table
5/31/2023
Modeled after React Project from CS290, our own work.*/

import React from 'react';
import TitleHostRow from './TitleHostRow';

/*Table for Title Host entity*/
function TitleHostTable({ titlehosts, loadTitleHosts }) {
    return (
            <tbody>
                {titlehosts.map((titlehost, i) => <TitleHostRow titlehost={titlehost} loadTitleHosts={loadTitleHosts}
                    key={i} />)}
            </tbody>
    );
}

export default TitleHostTable;