import React from 'react'
import { Container, Jumbotron, Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'
import {connect} from 'react-redux'
import  { bindActionCreators } from 'redux';
import {deleteRoutine} from '../../redux/actions/index'
import { calculateDuration } from '../../helperFunctions/functions'
import { useHistory } from 'react-router-dom';

function RoutineDetails(props) {
    const history = useHistory();   
    
    const onDeleteRoutine = () =>{
        props.deleteRoutine(props.routine);
        history.push('/Routines');
        window.location.reload(false);   
    }
    
    return (
        <Container>
            <Jumbotron className="mt-3">
                <h1 className="display-3">{props.routine.name}</h1>
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

const mapDispatchProps = (dispatch) => bindActionCreators({deleteRoutine}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(RoutineDetails)