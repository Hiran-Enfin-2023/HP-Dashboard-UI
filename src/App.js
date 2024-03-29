// src/App.js

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import "./App.css"
function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  // const [selectedValue, setSelectedValue] = useState('transcripts');
  const [menu, setMenu] = useState('Concierge');


  useEffect(() => {
    const checkLogin = async () => {
      try {
       const token = localStorage.getItem('access-token');
       if(token)
        setLoggedIn(true);
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLogin();
  }, []);

  return (
    <Router>
      <div id='app'>
        <Header menu={menu} setMenu={setMenu} isLoggedIn={loggedIn}/>
        <Routes>
          {/* <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} /> */}
          <Route
            path="/"
            element={
              !loggedIn ? (
                <div>
                  <Login setLoggedIn={setLoggedIn} />
                </div>
              ) : (
                <Dashboard isLoggedIn={loggedIn} menu={menu} setMenu={setMenu}/>
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
