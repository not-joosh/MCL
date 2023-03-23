/*
  PACKAGES THAT ARE NEEDED:
    WEBPAGES
      npm install react-router-dom
    FIRBASE
      npm install firebase
      npm install react-firebase-hooks
    FORM
      npm install react-hook-form yup @hookform/resolvers
  DEPLOYMENT:
    npm install -g firebase-tools
    firebase login
    
*/
/*
  Dependency Imports
*/
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
/*
  Component, Page, Hook imports
*/
import { Home } from './home/Home';
import { Login } from './pages/Login';
import { CreatePost } from './create-post/CreatePost';
import { Navbar } from './components/Navbar';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path = "/" element = {<Home />}/>
          <Route path = "/login" element = {<Login />}/>
          <Route path = "/create-post" element = {<CreatePost />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;