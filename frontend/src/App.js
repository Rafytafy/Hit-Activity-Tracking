import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import firebase from 'firebase';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
import {fetchClients, fetchCurrentUser, fetchWorkouts, fetchRoutines} from './redux/actions/index'
//components
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Clients from "./components/Clients";
import Dash from "./components/Dash";
import Edit from "./components/Edit";
import Messages from "./components/Messages";
import Routines from "./components/routineComponents/Routines";
import Workouts from "./components/workoutComponents/Workouts";
import RoutineDetails from "./components/routineComponents/RoutineDetails"
import CreateRoutine from "./components/routineComponents/CreateRoutine"

function App(props) {
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
        setTimeout(() => {
          props.fetchCurrentUser();
        props.fetchWorkouts();
        props.fetchRoutines();
        }, 1000)
      }
      
    })
  });
  if (!loaded) {
    return (
      <h1 style={{ flex: 1, justifyContent: 'center' }}>
        Loading
      </h1>
    )
  }
  
  return (
    <div>
      <Router>
        {!loggedIn ?
            <>
          <Route exact path="/" component={Login} />
          <Route path="/Register" component={Register}/>
          </>
            :
          <>
          <Navbar />
          <Route exact path="/" component={Dash} />
          <Route path="/Profile" component={Profile} />
            <Route path="/Clients" component={Clients} />
            <Route path="/Edit" component={Edit} />
            <Route path="/Messages" component={Messages} />
            <Route path="/Routines" component={Routines} />
            <Route path="/workouts" component={Workouts} />
            <Route path="/routineDetails" component={RoutineDetails} />
            <Route path="/createRoutine" component={CreateRoutine} />
          </>
      }
        </Router>    
    </div>
  );
 
}


const mapDispatchProps = (dispatch) => bindActionCreators({fetchClients, fetchCurrentUser, fetchWorkouts, fetchRoutines}, dispatch)

export default connect(null, mapDispatchProps)(App);
