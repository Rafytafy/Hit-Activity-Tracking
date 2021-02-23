import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {createNewRoutine} from '../../redux/actions/index'
import {Container, Form, FormGroup, Label, Input, Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Col, Row} from 'reactstrap'

class createRoutine extends Component {
    state = {
        name: "",
        selectedWorkoutPlans: [],
        selectedWorkout: {},
        duration: 0
    }
    
    
    findWorkoutInArray(e){
        this.props.workouts.map((workout) => {
            if(workout.name == e.target.value){
                this.setState({selectedWorkout: workout})
            }
        })
    }

    addWorkoutToList(){
        console.log("Hello")
        console.log(this.state.duration)
        let plan = {
            workout: this.state.selectedWorkout,
            duration: this.state.duration
        }
        this.setState({selectedWorkoutPlans: [...this.state.selectedWorkoutPlans, plan]})
    }

    removeFromWorkoutPlanArray(workout){
        let newArr = this.state.selectedWorkoutPlans.filter((item) => workout.name !== item.workout.name)
        this.setState({
            selectedWorkoutPlans: newArr
        })
    }
    onCreateRoutine(){
        let newRoutine = {
            id: this.props.currentUser.uid,
            name: this.state.name,
            workouts: this.state.selectedWorkoutPlans
        }
        console.log(newRoutine);

        this.props.createNewRoutine(newRoutine)
        window.location.reload(false);
    }

    render() {
        return (
            <Container>
                <Form>
                    <FormGroup>
                        <Label for="exampleSelectMulti">Name</Label>
                        <Input type="text" onChange={(e) => this.setState({name: e.target.value})}></Input>        
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleSelectMulti">Select Workout</Label>
                        <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple onChange={ (e) => this.findWorkoutInArray(e)}>
                            {this.props.workouts.map((workout) => 
                                <option value={workout.name}>{workout.name}</option>
                            )}
                        </Input>        
                    </FormGroup>
                    <FormGroup>
                    <h1>Workout: {this.state.selectedWorkout.name}</h1>
                        <Label>Duration:</Label>
                        <Input
                        type="number"
                        name="number"
                        id="exampleNumber"
                        placeholder="number placeholder"
                        step=".5"
                        onChange={(e) => this.setState({duration: parseInt(e.target.value)})}
                        />
                    <Button onClick={() => this.addWorkoutToList()}>Add To Routine</Button>
                    </FormGroup>
                    
                    <ListGroup>
                        {this.state.selectedWorkoutPlans.map((item) =>
                            
                            <Row>
                            <Col xs="10">
                            <ListGroupItem>
                                <ListGroupItemHeading>{item.workout.name}</ListGroupItemHeading>
                                <ListGroupItemText>Duration: {item.duration}</ListGroupItemText>
                                <ListGroupItemText>Primary: {item.workout.primary}</ListGroupItemText>
                                <ListGroupItemText>Secondary: {item.workout.secondary}</ListGroupItemText>
                                <ListGroupItemText>Instructions: {item.workout.instructions}</ListGroupItemText>
                            </ListGroupItem>
                            </Col>
                            <Col xs="2" className="d-flex justify-content-center align-items-center">
                            <Button color="danger" size="lg" onClick={() => this.removeFromWorkoutPlanArray(item.workout)}>X</Button>
                            </Col>
                            </Row>
                        )}
                        
                    </ListGroup>
                    <Button color="success" className="float-right" onClick={() => this.onCreateRoutine()}>Create routine</Button>
                </Form>
            </Container>
        )
    }
}

const mapStateToProps = (store) => ({
    workouts: store.workouts.list,
    currentUser: store.user.data[0]
})

const mapDispatchProps = (dispatch) => bindActionCreators({ createNewRoutine }, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(createRoutine)
