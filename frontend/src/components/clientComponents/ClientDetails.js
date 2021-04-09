import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Container, Jumbotron, Button, ListGroup, ListGroupItem, Col} from 'reactstrap'
import {connect} from 'react-redux'
import  { bindActionCreators } from 'redux';
import {setCurrentClient} from '../../redux/actions/index'
import {useHistory, useParams} from 'react-router-dom';
import DefaultPicture from '../../images/default-profile-picture.png'
import Chart from "react-google-charts";
<<<<<<< HEAD
import { setGlobalCssModule } from 'reactstrap/es/utils';

const filler= {
    firstName: "Missing",
    lastName: "Name"
};
const filler2={
    feet:0,
    inches:0
};
=======
import firebase from 'firebase';
>>>>>>> main

function ClientDetails(props) {
    const history = useHistory();
    let { id } = useParams();
<<<<<<< HEAD
    const [client, setClient]=useState([]);
    const [name, setName] = useState(filler);
    const [user, setUser] = useState(null);
    const [age, setAge] = useState(0);
    const [height, setHeight] = useState(filler2);
    //const [weights, setWeights]= useState([0]);
    const [weight, setWeight] = useState(0);
    const [curWeight, setCurWeight] = useState('...');
    const [email, setEmail] = useState('Email Unavailable');
    

=======
    const [picture, setPicture] = useState("");
>>>>>>> main
    

    useEffect(() => {
        console.log("useEffect called");
        if(props.client.name.firstName === ""){
            axios.get(`http://localhost:5000/subscriber/${id}`)
            .then((res) => {
                props.setCurrentClient(res.data)
            
            })
        }
<<<<<<< HEAD
        const {currentClient, client, curWeight, weight, email} = props; 
=======
        axios.get(`http://localhost:5000/subscriber/${id}`)
            .then((res) => {
                props.setCurrentClient(res.data)
                firebase.storage().ref(res.data.profilePicURL).getDownloadURL().then((url) => {
                    setPicture(url);
                })
            })

        if (!picture) { setPicture(DefaultPicture) }
        
      }, []);
>>>>>>> main
      
        var today = new Date();
        var cDay = today.getDate();
        var cMonth = today.getMonth();
        var cYear = today.getFullYear();
        var todayDate = new Date(cYear, cMonth, cDay);
        var birth = new Date(props.client.birthdate);
        var diff = Math.abs(todayDate - birth);
        const age = Math.floor(diff / 31536000000);
                  
      
      if(typeof client._id !== "undefined"){
       //setWeights(weight);
        
        var w1 = client.weights.length;
        if(w1 !== 0){
          setCurWeight(client.weights[w1-1].weight)
          setHeight(client.height);
          setClient(client);
          setUser(client._id)
          setAge(age);
          setName(client.name); 
          
          setWeight(client.initWeight);
          setEmail(client.email);
      }
      }
      //pop most recent weight
<<<<<<< HEAD
      //var weight_array= (props.client.weights)
      //var last_element = weight_array[weight_array.length - 1].weight;
=======
      var weight_array= (props.client.weights)
      
    
>>>>>>> main

      }, []);
    const renderGraphData = () => {
        let data = [["time", "value"]]
        for(let i = 0; i < props.client.workoutSessions[props.client.workoutSessions.length - 1].heartrate.length; i++){
            data = [...data, [props.client.workoutSessions[props.client.workoutSessions.length - 1].heartrate[i].time, props.client.workoutSessions[props.client.workoutSessions.length - 1].heartrate[i].value]]
            
        }

        
        console.log(data)
        return data
    }
    return ( 

    <Container className="container-fluid">
        <Jumbotron className="mt-3">
            
            <div className="d-flex">
                <Col xs={6}>
                <img src={DefaultPicture} style={{width: '10em'}}/>
                <img src={picture} style={{width: '10em'}}/>
                <div>
                    <h1 className="display-4">{name.firstName} {name.lastName}</h1>
                </div>
                </Col>
                <Col>
                <div className="floatRight">
<<<<<<< HEAD
                    
                    <h6>Age: {age}</h6>
                    <h6>Weight: {weight}</h6>
                    {
                        curWeight ? 
                        (
                            <h6>Current Weight: {curWeight}</h6>
                        )
                        :
                        <h6>Current Weight: Loading</h6>
                    }
                    <h6>Height: {height.feet}' {height.inches}"</h6>
                    <h4 className="client-bottom-align">{email}</h4>
=======
                    { props.client.weights ?
                        ( 
                            <>
                                <h6>Age: {age}</h6>
                                <h6>Weight: {props.client.initWeight}</h6>
                                <h6>Current Weight: {weight_array[weight_array.length - 1].weight}</h6>
                                <h6>Height: {props.client.height.feet}' {props.client.height.inches}"</h6>
                                <h4 className="client-bottom-align">{props.client.email}</h4>
                            </>
                        )
                        :
                        (<></>)
                    }       
>>>>>>> main
                </div>
                </Col>
            </div>
            <hr className="my-2" />
<<<<<<< HEAD
            {/* k */}
=======
            <div className="clearfix">
                <h3>Recent Activity</h3>
                    {props.client.workoutSessions[0] !== undefined? //Check if workoutSessions exist for user
                        (   <>
                            <div style={{ display: 'flex', maxWidth: 1000 }}>
                                <Chart
                                    width={1000}
                                    height={300}
                                    chartType="LineChart"
                                    loader={<div>Loading Chart</div>}
                                    data={renderGraphData()}
                                    options={{
                                    title: `Routine: ${props.client.workoutSessions[props.client.workoutSessions.length - 1].routine.name}\n Date: ${props.client.workoutSessions[props.client.workoutSessions.length - 1].date.slice(0, 10)}`,
                                    chartArea: { width: '90%' },
                                    hAxis: {
                                        title: 'Time',
                                        minValue: 0,
                                    },
                                    vAxis: {
                                        title: 'Heart Rate',
                                    },
                                    }}
                                    legendToggle
                                />
                                
                                </div>
                                <Button className="float-right mt-3" onClick={() => history.push(`/workoutSession/${props.client._id}`)}>View History</Button>
                                </>
                                )
                        :
                        (
                            <h3 className="d-flex justify-content-center">
                            No recent activity
                            </h3>
                        )
                    }     
            </div>
>>>>>>> main
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