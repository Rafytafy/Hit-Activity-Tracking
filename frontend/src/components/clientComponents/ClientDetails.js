import React from 'react'
import { Container, Jumbotron, Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'
import {connect} from 'react-redux'
import  { bindActionCreators } from 'redux';
import {useHistory} from 'react-router-dom';
import DefaultPicture from '../../images/default-profile-picture.png'


function ClientDetails(props) {
    const history = useHistory();

    return ( 

    <div className="container-fluid">
        <Jumbotron className="mt-3">
            <div className="d-flex">
                <img src={DefaultPicture} style={{width: '10em'}}/>
                <div>
                    <h7>Client Name:</h7>
                    <h1 className="display-4">{props.client.name.firstName}</h1>
                </div>
            </div>
            <h3>Recent Activity</h3>
            <h3>Current Program</h3>
            <Button onClick={() => history.push('/createProgram')}>Create new Program</Button>
            <hr className="my-2" />
            <Button onClick={() => history.push('/Clients')}> Back to Clients</Button>
        </Jumbotron>
    </div>
)
}

const mapStateToProps = (store) => ({
        client: store.clients.currentClient
    })
    
export default connect(mapStateToProps, null)(ClientDetails)