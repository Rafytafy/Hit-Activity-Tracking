import React, {useState} from 'react'; 
import firebase from 'firebase'
import axios from 'axios'
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
import {fetchCurrentUser, fetchWorkouts, fetchRoutines} from '../../redux/actions/index'
import { Form, FormGroup, Input, Button, Row, Alert } from 'reactstrap';
import Heartbeat from '../../images/Heartbeat.png';
import { useHistory } from 'react-router-dom';
const Register = (props) => {
  //States
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const history = useHistory(); 
  
  const onSubmit = (e) => {
    e.preventDefault();
    let tokenId;
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then( async () => {
        await firebase.auth().currentUser.getIdToken(true)
          .then((result) => {
            tokenId = result;
          })
      })
      .then(async () => {
        await axios.post('http://localhost:5000/register/trainer', {
          tokenId,
          firstName,
          lastName,
          email
        })
        .then((res) => {
          props.fetchCurrentUser();
          props.fetchWorkouts();
          props.fetchRoutines();
          history.push('/')
        })
      })
      
      .catch((error) => {
        console.log(error)
        setError(true);
      })
   
    
    
    }
  const toLogin = () => { history.push('/') }
  
  const onDismiss = () => {
        setError(false)
    }
  
  return (
    <div className="login">
      <Form> 
        <FormGroup>
          <div className = "title"> 
          <img src ={Heartbeat} alt="Logo"/>
            <h1> Pulse Register </h1>
          </div>
          <Row>
            <Input onChange={(value) => setFirstName(value.target.value)}
              type="text"
              name="firstName"
              placeholder="First Name" />
          </Row>
          <Row>
            <Input onChange={(value) => setLastName(value.target.value)}
              type="text"
              name="lastName"
              placeholder="Last Name" />
          </Row>

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
            <Button onClick={onSubmit} color="secondary" size="lg"> Register </Button>
            <div class = "divider"/> 
              <Button onClick={toLogin} color="secondary" size="lg"> Back to Login </Button>
            </Row>
            <div className="space" />
            <Row>
              <Alert color = "danger" isOpen={error} toggle = {onDismiss}> Please enter a valid Email, and a Password at least 6 characters. </Alert>
            </Row>
        </div>
      </FormGroup>
    </Form>
     
     </div>
     
    
      
    
     
  
    );
}

const mapDispatchProps = (dispatch) => bindActionCreators({fetchCurrentUser, fetchWorkouts, fetchRoutines}, dispatch)

export default connect(null, mapDispatchProps)(Register)
