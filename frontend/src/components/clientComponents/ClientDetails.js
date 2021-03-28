import React, {useEffect} from 'react'
import axios from 'axios'
import { Container, Jumbotron, Button, ListGroup, ListGroupItem, Col} from 'reactstrap'
import {connect} from 'react-redux'
import  { bindActionCreators } from 'redux';
import {setCurrentClient} from '../../redux/actions/index'
import {useHistory, useParams} from 'react-router-dom';
import DefaultPicture from '../../images/default-profile-picture.png'


function ClientDetails(props) {
    const history = useHistory();
    let { id } = useParams();

    useEffect(() => {
        if(props.client.name.firstName === ""){
            axios.get(`http://localhost:5000/subscriber/${id}`)
            .then((req) => {
                props.setCurrentClient(req.data)
            })
        }
      });
      
      //convert birthday to age
      var today = new Date();
      var cDay = today.getDate();
      var cMonth = today.getMonth();
      var cYear = today.getFullYear();
      var todayDate = new Date(cYear, cMonth, cDay);
      var birth = new Date(props.client.birthdate);
      var diff = Math.abs(todayDate - birth);
      const age = Math.floor(diff / 31536000000);
      const setAge = (age);

      //pop most recent weight
      var weight_array= (props.client.weights)
      var last_element = weight_array[weight_array.length - 1].weight;
      
    return ( 

    <Container className="container-fluid">
        <Jumbotron className="mt-3">
            <div className="d-flex">
                <Col xs={6}>
                <img src={DefaultPicture} style={{width: '10em'}}/>
                <div>
                    <h1 className="display-4">{props.client.name.firstName} {props.client.name.lastName}</h1>
                </div>
                </Col>
                <Col>
                <div className="floatRight">
                    
                    <h6>Age: {age}</h6>
                    <h6>Weight: {props.client.initWeight}</h6>
                    <h6>Current Weight: {last_element}</h6>
                    <h6>Height: {props.client.height.feet}' {props.client.height.inches}"</h6>
                    <h4 className="client-bottom-align">{props.client.email}</h4>
                </div>
                </Col>
            </div>
            <hr className="my-2" />
            <h3>Recent Activity</h3>
            <h3 className="d-flex justify-content-center">
                No recent activity
            </h3>
            <hr className="my-2" />
            <h3>Current Program</h3>
            {props.client.routines !== null ?
                <ListGroup className="d-flex justify-content-center">
                {props.client.routines.map((routine) =>
                <ListGroupItem>
                    {routine.name}
                </ListGroupItem>
                    
                )}
                </ListGroup>
                :
                <h3 className="d-flex justify-content-center">
                    Subscriber currently does not have a program assigend 
                </h3>
                
            }
            <div className="clearfix">
                <Button className="mt-3 float-right" onClick={() => history.push(`/createProgram/${props.client._id}`)}>Create new Program</Button>
            </div>
            <hr className="my-2" />
            <Button onClick={() => history.push('/Clients')}> Back to Clients</Button>
        </Jumbotron>
    </Container>
)
}

const mapStateToProps = (store) => ({
        client: store.clients.currentClient
    })
    
const mapDispatchProps = (dispatch) => bindActionCreators({ setCurrentClient }, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(ClientDetails)