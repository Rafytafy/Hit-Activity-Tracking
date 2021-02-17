import React, { useState } from 'react'; 
import { useHistory } from 'react-router-dom';
import firebase from 'firebase'
import { Form, FormGroup, Input, Button, Row } from 'reactstrap';
import Heartbeat from './Heartbeat.png';




const Login = (props) => {
 
//States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory(); 
  
  const authLogin = () => {
    
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then((result) => {
        console.log(result)
    })
    .catch((error) => {
        console.log(error)
    })
  }
   
  const toRegister = () => 
  { 
    history.push('/Register')
    }
    return (
        <div className = "login"> 
 <Form> 
          <FormGroup>
            <div className="title"> 
             <img src ={Heartbeat} alt="Logo"/>  
              <h1> Pulse Login</h1>
              </div>
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
                <Button onClick={authLogin} color="secondary" size="lg"> Sign in </Button>
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