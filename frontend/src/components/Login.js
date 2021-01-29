import React, {useState} from 'react'; 
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button, Row } from 'reactstrap';
//import {./App.css}


export default function Login() {
//States
  const [] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateBlank(){
      return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event){
      event.preventDefault();
  }
    return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
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
        <Button block size="lg" type="submit" disabled={!validateBlank()}>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;