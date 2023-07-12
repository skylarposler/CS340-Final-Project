/*Modeled after React concepts from CS290*/

import React from "react";
import { Link } from "react-router-dom";

function Navigation(){
    return(
        <nav>
            <ul className='navigation-bar'>
                <Link to='/'><li>Home</li></Link>
                <Link to='/Users'><li>Users</li></Link>
                <Link to='/Subscriptions'><li>Subscriptions</li></Link>
                <Link to='/StreamingPlatforms'><li>Streaming Platforms</li></Link>
                <Link to='/TitleHosts'><li>Title Host</li></Link>
                <Link to='/Titles'><li>Titles</li></Link>
            </ul>
        </nav>  
    );
}

export default Navigation;