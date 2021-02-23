import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {createNewRoutine} from '../../redux/actions/index'
import {Alert, Container, Form, FormGroup, Label, Input, Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Col, Row, Jumbotron} from 'reactstrap'

class CreateRoutine extends Component {
    state = {
        name: "",
        selectedWorkoutPlans: [],
        selectedWorkout: {},
        duration: 0,
        visibleError: false,
        visibleComplete: false
    }
    
    
    findWorkoutInArray(e){
        this.props.workouts.map((workout) => {
            if(workout.name == e.target.value){
                this.setState({selectedWorkout: workout})
            }
        })
    }

    addWorkoutToList(){
        if(this.state.selectedWorkout.name === undefined || this.state.duration === 0){
            this.setState({visibleError: true})
        }
        else{
            let plan = {
                workout: this.state.selectedWorkout,
                duration: this.state.duration
            }
            this.setState({selectedWorkoutPlans: [...this.state.selectedWorkoutPlans, plan]})
            this.setState({
                selectedWorkout: {},
                duration: 0
            })
        }
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

        setTimeout(this.setState({visibleComplete: true}), 3000)

        
    

    }

    render() {
        return (
            <Container>
                <Jumbotron className="mt-5">
                    <Alert color='danger' isOpen={this.state.visibleError} toggle={() => this.setState({visibleError: false})}>Make sure you have a workout selected and a duration before you add to routine</Alert>
                    <Alert color='success' isOpen={this.state.visibleComplete} toggle={() => this.setState({visibleComplete: false})}>Successfuly created new routine</Alert>
                    <Form>
                        <h1>Create New Routine</h1>
                        <FormGroup className="d-flex">
                            <Label className="mt-auto mr-3" for="exampleSelectMulti">Name: </Label>
                            <Input size="small" type="text" onChange={(e) => this.setState({name: e.target.value})}></Input>        
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
                            
                                
                            <h4>Workout: {this.state.selectedWorkout.name}</h4>
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
                                value={this.state.duration}
                                onChange={(e) => this.setState({duration: parseFloat(e.target.value)})}
                                />
                                </Col>
                                <Col xs="2" className="d-flex justify-content-center">
                                <Button  onClick={() => this.addWorkoutToList()}>Add To Routine</Button>
                                </Col>
                            </Row>
                        </FormGroup>
                        
                        <ListGroup>
                            {this.state.selectedWorkoutPlans.map((item) =>
                                
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
                                <Button color="danger" size="lg" onClick={() => this.removeFromWorkoutPlanArray(item.workout)}>X</Button>
                                </Col>
                                </Row>
                            )}
                            
                        </ListGroup>
                        {this.state.selectedWorkoutPlans.length > 0 ?
                            <Button color="success" className="float-right" onClick={() => this.onCreateRoutine()}>Create routine</Button>
                            :
                            <></>
                        }
                        
                    </Form>
                </Jumbotron>
            </Container>
        )
    }
}

const mapStateToProps = (store) => ({
    workouts: store.workouts.list,
    currentUser: store.user.data[0]
})

const mapDispatchProps = (dispatch) => bindActionCreators({ createNewRoutine }, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(CreateRoutine)
