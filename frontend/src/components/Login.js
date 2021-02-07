import React, {useState} from 'react'; 
import firebase from 'firebase'
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button, Row } from 'reactstrap';
//import {./App.css}



const Login = (props) => {
 
//States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const authLogin = () => {
    
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
        <FormGroup>
          <Row>
            <Input onChange={(value) => setEmail(value.target.value)}
              type="Email"
              name="email"
              placeholder="Email" />
          </Row>
          <Row> 
            <Input onChange={(value) => setPassword(value.target.value)}
              type="password"
              name="Password"
              placeholder="Password" />
            </Row>
            <div className="button"> 
            <Row>
                <Button onClick={authLogin} color="secondary" size="lg">Sign in</Button>
                <div class = "divider"/> 
                <Button onClick={toRegister} color="secondary" size="lg"> Register </Button>
                </Row>
            </div>
      </FormGroup>
    </Form>
    </div>
  );
  
}

export default Login;