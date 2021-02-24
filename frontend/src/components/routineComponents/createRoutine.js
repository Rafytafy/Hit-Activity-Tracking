import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {createNewRoutine} from '../../redux/actions/index'
import {Alert, Container, Form, FormGroup, Label, Input, Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Col, Row, Jumbotron} from 'reactstrap'

function CreateRoutine(props) {
    const history = useHistory();

    const [name, setName] = useState(""),
          [selectedWorkoutPlans, setSelectedWorkoutPlans] = useState([]),
          [selectedWorkout, setSelectedWorkout] = useState({}),
          [duration, setDuration] = useState(0),
          [visibleError, setVisibleError] = useState(false),
          [visibleComplete, setVisibleComplete] = useState(false),
          [visibleNameError, setVisibleNameError] = useState(false);
    
    
    const findWorkoutInArray = (e) =>{
        props.workouts.map((workout) => {
            if(workout.name == e.target.value){
                setSelectedWorkout(workout)
            }
        })
    }

    const addWorkoutToList = () =>{
        if(selectedWorkout.name === undefined || duration === 0){
            setVisibleError(true)
        }
        else{
            let plan = {
                workout: selectedWorkout,
                duration: duration
            }
            setSelectedWorkoutPlans([...selectedWorkoutPlans, plan])
            setSelectedWorkout({});
            setDuration(0);
            setVisibleError(false)
        }
    }

    const removeFromWorkoutPlanArray = (workout) => {
        let newArr = selectedWorkoutPlans.filter((item) => workout.name !== item.workout.name)
        setSelectedWorkoutPlans(newArr);
    }
    const onCreateRoutine = () =>{
        if(name === ''){
            setVisibleNameError(true)
        }
        else{
            let newRoutine = {
                id: props.currentUser.uid,
                name: name,
                workouts: selectedWorkoutPlans
            }
    
            props.createNewRoutine(newRoutine)
            history.push('/Routines')
            window.location.reload(false);
        }
    }

    
    return (
        <Container>
            <Jumbotron className="mt-5">
                <Alert color='danger' isOpen={visibleError} toggle={() => setVisibleError(false)}>Make sure you have a workout selected and a duration before you add to routine</Alert>
                <Alert color='success' isOpen={visibleComplete} toggle={() => setVisibleComplete(false)}>Successfuly created new routine</Alert>
                <Alert color='danger' isOpen={visibleNameError} toggle={() => setVisibleNameError(false)}>You need to add a name to the routine</Alert>
                <Form>
                    <h1>Create New Routine</h1>
                    <FormGroup className="d-flex">
                        <Label className="mt-auto mr-3" for="exampleSelectMulti">Name: </Label>
                        <Input size="small" type="text" onChange={(e) => setName(e.target.value)}></Input>        
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleSelectMulti">Select Workout</Label>
                        <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple onChange={ (e) => findWorkoutInArray(e)}>
                            {props.workouts.map((workout) => 
                                <option value={workout.name}>{workout.name}</option>
                            )}
                        </Input>        
                    </FormGroup>
                    <FormGroup>
                        
                            
                        <h4>Workout: {selectedWorkout.name}</h4>
                        <Row>
                            <Col xs="2">
                            <Label className="float-right">Duration:</Label>
                            </Col>
                        
                            <Col xs="8">
                            
                            <Input
                            type="number"
                            name="number"
                            placeholder="number placeholder"
                            step="any"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            />
                            </Col>
                            <Col xs="2" className="d-flex justify-content-center">
                            <Button  onClick={() => addWorkoutToList()}>Add To Routine</Button>
                            </Col>
                        </Row>
                    </FormGroup>
                    
                    <ListGroup>
                        {selectedWorkoutPlans.map((item) =>
                            
                            <Row>
                            <Col xs="10">
                            <ListGroupItem>
                                <ListGroupItemHeading>{item.workout.name}</ListGroupItemHeading>
                                <ListGroupItemText>Duration: {item.duration} minutes</ListGroupItemText>
                                <ListGroupItemText>Primary: {item.workout.primary}</ListGroupItemText>
                                <ListGroupItemText>Secondary: {item.workout.secondary}</ListGroupItemText>
                                <ListGroupItemText>Instructions: {item.workout.instructions}</ListGroupItemText>
                            </ListGroupItem>
                            </Col>
                            <Col xs="2" className="d-flex justify-content-center align-items-center">
                            <Button color="danger" size="lg" onClick={() => removeFromWorkoutPlanArray(item.workout)}>X</Button>
                            </Col>
                            </Row>
                        )}
                        
                    </ListGroup>
                    {selectedWorkoutPlans.length > 0 ?
                        <Button color="success" className="float-right" onClick={() => onCreateRoutine()}>Create routine</Button>
                        :
                        <></>
                    }
                    
                </Form>
            </Jumbotron>
        </Container>
    )
    
}

const mapStateToProps = (store) => ({
    workouts: store.workouts.list,
    currentUser: store.user.data[0]
})

const mapDispatchProps = (dispatch) => bindActionCreators({ createNewRoutine }, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(CreateRoutine)
