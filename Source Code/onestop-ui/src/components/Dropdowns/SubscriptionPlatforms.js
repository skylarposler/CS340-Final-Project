/*Citation for Dropdowns 
6/7/2023
OneStopAnime - Made with REACT
Our own work*/

/*Maps platform names for Subscriptions dropdown*/
function SubscriptionPlatforms({ platforms }) {
    return (
        <option value={platforms.platform_id}> {platforms.platform_name}</option>
    );
}

export default SubscriptionPlatforms;