import React, { useState } from 'react'; 
import { useHistory, Link } from 'react-router-dom';
import { Jumbotron, Row, } from 'reactstrap';
import firebase from 'firebase';
import {connect} from 'react-redux'


const Dash = (props) => {
    
    const history = useHistory();   

    const toClients = () => { history.push('/Clients') }
    const toMessages = () => { history.push('/Messages') }
    const toRoutines = () => { history.push('/Routines') }
    
    return ( 
        <div> 
            <div className = "topDash"> 
            <h1> Trainer Dashboard</h1>
            <h2> Hi {props.currentUser.name.firstName}, Welcome back!</h2>
            {console.log(props.currentUser)}
            </div>
            <di className = "dash">
                <Row>
                    <Jumbotron onClick = { toMessages } > 
              <h1>Messages</h1>
                    </Jumbotron>
            <div className = "dashDivider"/>
            <Jumbotron onClick = { toClients }> 
                <h1> Clients</h1>
                    </Jumbotron>
                    <div className = "dashDivider"/>
                <Jumbotron onClick = { toRoutines }> 
                 <h1> Routines</h1>
                    </Jumbotron>
                    </Row> 
                </di>
                
                   
               
            
            

        </div>
    );
}

const mapStateToProps = (store) => ({
    currentUser: store.user.data[0]
})

export default  connect(mapStateToProps, null)(Dash);