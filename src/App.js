import React from 'react';

import './css/landing.css';
import './css/navbar.css';
import './css/result.css';
import './css/login.css';
import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import Landing from './Components/Landing'

function App() {
  return (
    <div className="App container">
		  <Landing />
    </div>
  );
}

export default App;
