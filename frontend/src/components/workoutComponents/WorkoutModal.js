import React, { Component } from 'react';
import { postWorkouts } from '../../redux/actions/index';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap'

class WorkoutModal extends Component {
    
    state = {
        modal: false,
        name: '',
        primary: '',
        secondary: '',
        instructions: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    };

    onSubmit = (e) => {
        e.preventDefault()
        const newWorkout = {
            name: this.state.name,
            primary: this.state.primary,
            secondary: this.state.secondary,
            instructions: this.state.instructions
        };

        //Add item via addItem action 
        console.log("Hello from modal")
        this.props.postWorkouts(newWorkout)

         this.toggle();
    };

    render() {
        return (
            <div>
                <Button
                    color="dark"
                    onClick={this.toggle}
                    style={{margin:".25em 0 1em 1em"}}
                >Create Workout</Button>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Create Workout</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="workoutName">Name</Label>
                                <Input 
                                    type="text"
                                    name="name"
                                    id="workoutName"
                                    placeholder="Enter name of Workout"
                                    onChange={this.onChange}
                                />
                                
                                <Label for="primary">Primary</Label>
                                <Input 
                                    type="text"
                                    name="primary"
                                    id="primary"
                                    placeholder="Enter muscle group"
                                    onChange={this.onChange}
                                />
                                
                                <Label for="secondary">Secondary</Label>
                                <Input 
                                    type="text"
                                    name="secondary"
                                    id="secondary"
                                    placeholder="Enter muscle group"
                                    onChange={this.onChange}
                                />

                                <Label for="instructions">Instructions</Label>
                                <Input 
                                    type="textarea"
                                    name="instructions"
                                    id="instructions"
                                    placeholder="Enter instructions for workout"
                                    onChange={this.onChange}
                                />
                                
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block>Create Workout
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapDispatchProps = (dispatch) => bindActionCreators({ postWorkouts }, dispatch)

export default connect(null, mapDispatchProps)(WorkoutModal);