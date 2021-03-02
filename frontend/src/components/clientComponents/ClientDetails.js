import React from 'react'
import { Container, Jumbotron, Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'
import {connect} from 'react-redux'
import  { bindActionCreators } from 'redux';
import {useHistory} from 'react-router-dom';


function ClientDetails(props) {
    const history = useHistory();

    return ( 

        <Container>
        <Jumbotron className="mt-3">
            <h1 className="display-3"></h1>
            <h3>Recent Activity</h3>

            <hr className="my-2" />
            <Button onClick={() => history.push('/Clients')}> Back to Clients</Button>
        </Jumbotron>
    </Container>
)
}

const mapStateToProps = (store) => ({
        client: store.clients.currentClient
    })
const mapDispatchProps = (dispatch) => bindActionCreators(dispatch)

export default connect(mapStateToProps, null)(ClientDetails)