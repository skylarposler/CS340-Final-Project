/*Citation for this node module for App.js
5/20/2023
Modeled after React Project from CS290, our own work.*/

import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navigation from './components/Navigation.js';
import Titles from './pages/Titles.js';
import TitleUpdate from './components/TitleUpdate';
import Users from './pages/Users.js';
import UserUpdate from './components/UserUpdate';
import StreamingPlatforms from './pages/StreamingPlatforms.js';
import StreamingPlatformUpdate from './components/StreamingPlatformUpdate'
import TitleHosts from './pages/TitleHosts';
import TitleHostUpdate from './components/TitleHostUpdate';
import Subscriptions from './pages/Subscriptions';

function App() {

  return (
    <Router>
        <Navigation />
        <header className="App-Header">
          <h1>Onestop Anime</h1>
        </header>

          <main>
            <Routes>
              <Route path ="/" element={<HomePage />} />
              <Route path="/Titles" element={<Titles />} />
              <Route path="/Titles/update" element={<TitleUpdate />} />
              <Route path="/Users" element={<Users />} />
              <Route path="/Users/update" element={<UserUpdate />} />
              <Route path="/StreamingPlatforms" element={<StreamingPlatforms />} />
              <Route path="/StreamingPlatforms/update" element={<StreamingPlatformUpdate />} />
              <Route path="/TitleHosts" element={<TitleHosts />} />
              <Route path="/TitleHosts/update" element={<TitleHostUpdate />} />
              <Route path="/Subscriptions" element={<Subscriptions />} />
            </Routes>
            
          </main>
          <footer>
            <p>&copy; <strong>2023 OneStop Anime. All Rights Reserved.</strong></p>
          </footer>
          
    </Router>
    

  );
}

export default App;
