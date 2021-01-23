import React, {useState} from 'react'; 

import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button, Row } from 'reactstrap';

const Register = (props) => {
//States
  const [] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  return (
    <div className="Register">
      
        <Form> 
        <FormGroup>
          <Row>
            <Input onChange={(firstName) => setFirstName(firstName)}
              type="text"
              name="firstName"
              placeholder="First Name"> </Input>
          </Row>
          <Row>
            <Input onChange={(lastName) => setLastName(lastName)}
              type="text"
              name="lastName"
              placeholder="Last Name"> </Input>
          </Row>
          <Row>
            <Input onChange={(email) => setEmail(email)}
              type="Email"
              name="email"
              placeholder="Email"> </Input>
          </Row>
          <Row> 
            <Input onChange={(password) => setPassword(password)}
              type="password"
              name="Password"
              placeholder="Password"> </Input>
          </Row>
          <Row> 
            <Input onChange={(setHeight) => setHeight(height)}
              type="text"
              name="Height"
              placeholder="Height"> </Input>
        </Row>
          <Row> 
            <Input onChange={(setWeight) => setWeight(weight)}
              type="text"
              name="Weight"
              placeholder="Weight"> </Input>
          </Row>
           <Row>
        <Button color="secondary" size="lg">Register</Button>
      </Row>
      </FormGroup>
      </Form>
     
        
    </div>
     
    
      
    
     
  
    );
}

export default Register;