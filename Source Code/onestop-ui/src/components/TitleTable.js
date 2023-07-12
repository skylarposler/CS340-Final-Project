/*Citation for this node module for Title Table
5/31/2023
Modeled after React Project from CS290, our own work.*/

import React from 'react';
import TitleRow from './TitleRow';

/*Table for Titles entity*/
function TitleTable({ titles, loadTitles }) {
    return (
            <tbody>
                {titles.map((title, i) => <TitleRow title={title} loadTitles={loadTitles}
                    key={i} />)}
            </tbody>
    );
}

export default TitleTable;