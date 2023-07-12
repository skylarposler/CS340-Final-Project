/*Citation for Dropdowns 
6/7/2023
OneStopAnime - Made with REACT
Our own work*/

/*Maps platform names for Title Host dropdown*/

import React from 'react';

function TitleHostTitles({ titles }) {

    return (
        <option value={titles.title}> {titles.title}</option>
    );
}

export default TitleHostTitles;