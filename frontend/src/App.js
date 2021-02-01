import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import firebase from 'firebase';
//components
import Register from "./components/register";

import Navbar from "./components/Navbar";
import Home from "./components/Home";

import Login from "./components/Login";


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

  const [loggedIn, setLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one

  }
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setLoggedIn(false)
        setLoaded(true)
      }
      else {
      setLoggedIn(true)
      setLoaded(true)
        
      }
    })
  } );
  if (!loaded) { 
      return(
        <h1 style={{flex:1,justifyContent:'center'}}>
           Loading
       </h1>
      )
  }
  
  if (!loggedIn)
  { 
    return ( 
      <div>
        <Router>
          <Route exact path="/" component={Login} />
          <Route path = "/Register" component = {Register}></Route>
        </Router>
       
      </div>
      
    )
    }
  if (loggedIn)
  { 
    return ( 
      <div>
        <Router>
          <Navbar />
        <Route exact path = "/" component={Home} />
        </Router>
      </div>
     
    )
  }
 }
  



export default App;
