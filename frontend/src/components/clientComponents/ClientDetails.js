import React from 'react'
import { Container, Jumbotron, Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'
import {connect} from 'react-redux'
import  { bindActionCreators } from 'redux';
import {useHistory} from 'react-router-dom';


function ClientDetails(props) {
    const history = useHistory();   




    return ( 

        <div> 
            <h1>hello WORLD</h1>
        </div>
    );

const mapStateToProps = (store) => ({
        routine: store.clients.currentClient
    })
}

export default connect(null)(ClientDetails)