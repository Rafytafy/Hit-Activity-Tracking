import React, {useState} from 'react'; 
import firebase from 'firebase'
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button, Row } from 'reactstrap';
//import {./App.css}



const Login = (props) => {
 
//States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  function authLogin(){
    const {email, password}= this.state;
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then((result) => {
        console.log(result)
    })
    .catch((error) => {
        console.log(error)
    })
  }
  
  function handleSubmit(event){
      event.preventDefault();
  }
   
    return (
    <div className="Login">
      <Form>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button onClick={authLogin} color="secondary" size="lg">Login</Button>
      </Form>
    </div>
  );
  
}

export default Login;