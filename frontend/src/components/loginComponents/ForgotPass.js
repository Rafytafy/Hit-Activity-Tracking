import React, {useState} from "react";
import firebase from "firebase";
import { Input, Alert, Button, FormGroup, Form, Row } from "reactstrap"
import { useHistory } from 'react-router-dom';
import Heartbeat from '../../images/Heartbeat.png'
const ForgotPass = () => {
    const [email, setEmail] = useState("");
    const [alert, setAlert] = useState(false);
    const [error, setError] = useState(false);
    const history = useHistory();

const forgotPassword = () => {
    firebase.auth().sendPasswordResetEmail(email).then(() => {
        console.log("email sent");
        setAlert(true)
    })
      .catch((error) => {
          console.log(error)
          setError(true);
    })
    }  
    const onDismiss = () => {
        setAlert(false)
        setError(false)
    }
 const toLogin = () => { history.push("/")}
    return (
        <div className="forgot">
            <Form>
                <FormGroup>
                    <div className="title"> 
             <img src ={Heartbeat} alt="Logo"/>  
              <h1> Pulse</h1>
              </div> 
                    <Row>
                        <Input onChange={(e) => setEmail(e.target.value)} type="Email" name="email" placeholder="Enter email to recover password" />
                    </Row>
                    <div className = "button"> 
                    <Row>
                        <Button onClick={forgotPassword} color="secondary" size="lg"> Submit</Button>
                    </Row>
                    <div className = "space"> </div>
                    <Row> 
                        <Button onClick={toLogin} color="secondary" size="lg"> Back to Login </Button>
                        </Row>
                    <div className = "space"/>
                        
          </div>
                    </FormGroup>
            </Form>
            <div className = "error"> 
            <Row>
                            <Alert color="info" isOpen={alert} toggle={onDismiss}> A recovery password has been sent to your email. </Alert>
                            <Alert color = "danger" isOpen={error} toggle = {onDismiss}> Please enter a valid Email. </Alert>
                </Row>
            </div>
        </div>

    );
}
export default ForgotPass;