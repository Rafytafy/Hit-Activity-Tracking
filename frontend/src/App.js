import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import firebase from 'firebase';
import { bindActionCreators } from 'redux';
import {connect, Provider } from 'react-redux'
import { fetchClients, fetchCurrentUser, fetchWorkouts, fetchRoutines } from './redux/actions/index'

//components
import Register from "./components/loginComponents/Register";
import Navbar from "./components/Navbar";
import Profile from "./components/profileComponents/Profile";
import Login from "./components/loginComponents/Login";
import Clients from "./components/clientComponents/Clients";
import ClientDetails from "./components/clientComponents/ClientDetails";
import Dash from "./components/Dash";
import Edit from "./components/profileComponents/Edit";
import Routines from "./components/routineComponents/Routines";
import Workouts from "./components/workoutComponents/Workouts";
import RoutineDetails from "./components/routineComponents/RoutineDetails";
import CreateRoutine from "./components/routineComponents/CreateRoutine";
import CreateProgram from "./components/clientComponents/ClientNewProgram";
import ForgotPass from "./components/loginComponents/ForgotPass";
import WorkoutSessions from "./components/clientComponents/WorkoutSessions";
import Footer from './components/Footer';
import Nav from './components/loginComponents/Nav';
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
            <Nav/>
          <Route exact path="/" component={Login} />
            <Route path="/Register" component={Register} />
            <Route path="/ForgotPass" component={ForgotPass} />
            <Footer />
          </>
            :
          <>
          <Navbar />
          <Route exact path="/" component={Dash} />
          <Route path="/Profile" component={Profile} />
            <Route path="/Clients" component={Clients} />
            <Route path="/clientDetails/:id" component={ClientDetails} />
            <Route path="/Edit" component={Edit} />
            <Route path="/workouts" component={Workouts} />
            <Route path="/Routines" component={Routines} />
            <Route path="/RoutineDetails/:id" component={RoutineDetails} />
            <Route path="/createRoutine" component={CreateRoutine} />
            <Route path="/createProgram/:id" component={CreateProgram} />
            <Route path="/workoutSession/:id" component={WorkoutSessions} />
           <Footer />
          </>
      }
      </Router>
      
      </div>
    
  );
 
}


const mapDispatchProps = (dispatch) => bindActionCreators({fetchClients, fetchCurrentUser, fetchWorkouts, fetchRoutines}, dispatch)

export default connect(null, mapDispatchProps)(App);
