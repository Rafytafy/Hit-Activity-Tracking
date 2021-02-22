import React from 'react'
import { Container, Jumbotron, Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'
import {connect} from 'react-redux'

import { calculateDuration } from '../../helperFunctions/functions'


function routineDetails(props) {
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
                    <Button color="danger" className="float-right mt-2">Delete Routine</Button>
                </p>
            </Jumbotron>
        </Container>
    )
}
const mapStateToProps = (store) => ({
    routine: store.routines.currentRoutine
})
export default connect(mapStateToProps, null)(routineDetails)