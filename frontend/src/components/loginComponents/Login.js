import React, { useState } from 'react'; 
import { useHistory } from 'react-router-dom';
import firebase from 'firebase'
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
import {fetchCurrentUser, fetchWorkouts, fetchRoutines} from '../../redux/actions/index'
import { Form, FormGroup, Input, Button, Row, Alert  } from 'reactstrap';
import Heartbeat from '../../images/Heartbeat.png';

const Login = (props) => {

//States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory(); 
  
  const authLogin = async () => {
    
    await firebase.auth().signInWithEmailAndPassword(email,password)
    .then((result) => {
        console.log("ASDFASDFADSFASDAFDSAFSDFADS")
        console.log(result)
        props.fetchCurrentUser();
        props.fetchWorkouts();
        props.fetchRoutines();
      
    })
    .catch((error) => {
      console.log(error)
      setError(true);
    })
  }
  const onDismiss = () => {setError(false)}
  
  const forgotPassword = () => { history.push('/ForgotPass')}
  const toRegister = () => { history.push('/Register') }

  return (
      <div className="login">
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
                <div className = "divider"/> 
                <Button onClick={toRegister} color="secondary" size="lg"> Register </Button>
                
            </Row>
            
            <div className = "space"/>
            <Button onClick={forgotPassword} color="secondary" size="lg"> Forgot Password?</Button>
          </div>
      </FormGroup>
      </Form>
       <div className = "space"/>
      <Row>
              <Alert color = "danger" isOpen={error} toggle = {onDismiss}> Invalid credentials. </Alert>
            </Row>
        </div>
  );
  
}

const mapDispatchProps = (dispatch) => bindActionCreators({fetchCurrentUser, fetchWorkouts, fetchRoutines}, dispatch)

export default connect(null, mapDispatchProps)(Login)