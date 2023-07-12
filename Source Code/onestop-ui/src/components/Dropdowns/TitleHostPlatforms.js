/*Citation for Dropdowns 
6/7/2023
OneStopAnime - Made with REACT
Our own work*/

 /*Maps platform names for Title Host dropdown*/
function TitleHostPlatforms({ platforms }) {
    return (
        <option value={platforms.platform_name}> {platforms.platform_name}</option>
    );
}

export default TitleHostPlatforms;
