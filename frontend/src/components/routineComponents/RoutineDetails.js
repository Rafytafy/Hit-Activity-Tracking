import React, {useEffect} from 'react'
import axios from 'axios'
import { Container, Jumbotron, Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'
import {connect} from 'react-redux'
import  {bindActionCreators} from 'redux';
import {deleteRoutine, setCurrentRoutine} from '../../redux/actions/index'
import { calculateDuration } from '../../helperFunctions/functions'
import { useHistory, useParams } from 'react-router-dom';

function RoutineDetails(props) {
    const history = useHistory();   
    let { id } = useParams();

    useEffect(() => {
        if(props.routine.name === ""){
            axios.get(`http://localhost:5000/routine/${id}`)
            .then((req) => {
                props.setCurrentRoutine(req.data)
            })
        }
      });
    const onDeleteRoutine = () =>{
        props.deleteRoutine(props.routine);
        history.push('/Routines');
        window.location.reload(false);   
    }
    
    return (
        <Container>
            <Jumbotron className="mt-3">
                <h1 className="display-3">{props.routine.name}</h1>
                <h4>Target Heart Rate: {props.routine.targetHeartrate}%</h4>
                <h3 className="lead">Total duration: {calculateDuration(props.routine.workouts)}</h3>
                <hr className="my-2" />
                <ListGroup>
                    {props.routine.workouts.map((item) =>
                        <ListGroupItem>
                            <ListGroupItemHeading>{item.workout.name}</ListGroupItemHeading>
                            <ListGroupItemText>Duration: {item.duration}</ListGroupItemText>
                            <ListGroupItemText>Primary: {item.workout.primary}</ListGroupItemText>
                            <ListGroupItemText>Secondary: {item.workout.secondary}</ListGroupItemText>
                            <ListGroupItemText>Instructions: {item.workout.instructions}</ListGroupItemText>
                        </ListGroupItem>  
                    )}
                </ListGroup>
                <p className="lead">
                    <Button color="danger" className="float-right mt-2" onClick={() => onDeleteRoutine()}>Delete Routine</Button>
                </p>
            </Jumbotron>
        </Container>
    )
}
const mapStateToProps = (store) => ({
    routine: store.routines.currentRoutine
})

const mapDispatchProps = (dispatch) => bindActionCreators({deleteRoutine, setCurrentRoutine}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(RoutineDetails)