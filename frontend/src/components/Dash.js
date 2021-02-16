import React, { useState } from 'react'; 
import { useHistory } from 'react-router-dom';
import { Jumbotron, Row, Container } from 'reactstrap';

const Dash = (props) => {
    
    return ( 
        <div> 
            <h1> Trainer Dashboard</h1>
            <h2>Hi Trainer, Welcome back!</h2>
            <Container>
                <Row>
                <Jumbotron> 
              <h1>Messages</h1> 
            </Jumbotron>
            <Jumbotron> 
                <h1> Clients</h1>
                </Jumbotron>
                <Jumbotron> 
                 <h1> Routines</h1>
                    </Jumbotron>
                    </Row> 
                </Container>
                
                   
               
            
            

        </div>
    );
}

export default Dash;