import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import firebase from 'firebase';
//components
import Register from "./components/register";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

function App() {
  var firebaseConfig = {
    apiKey: "AIzaSyDk_hueTUcYP2ULeS2dIIZwiKHybq8esC0",
    authDomain: "hit-activity-tracking.firebaseapp.com",
    databaseURL: "https://hit-activity-tracking-default-rtdb.firebaseio.com",
    projectId: "hit-activity-tracking",
    storageBucket: "hit-activity-tracking.appspot.com",
    messagingSenderId: "828801400123",
    appId: "1:828801400123:web:49474bcd4e2031ec6fcb1e"
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }
  return (
    <Router>
      <div>
        <Navbar />
        <Switch> 
          <Route exact path="/" component={Register} />
          <Route path = "/Home" component = {Home} />
      </Switch> 
      </div>
    </Router>
    
     
    
  );
}

export default App;
