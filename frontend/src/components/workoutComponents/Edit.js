import React, { Component } from 'react';
import { deleteWorkout, updateWorkout } from '../../redux/actions/index';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, Form, ModalFooter,
    FormGroup,
    Label,
    Input,
} from 'reactstrap'

class WorkoutModal extends Component {
    
    state = {
        modal: false,
        name: this.props.workout.name,
        primary: this.props.workout.primary,
        secondary: this.props.workout.secondary,
        instructions: this.props.workout.instructions
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    };

    onDelete = (e) => {
        console.log(this.props.workout)

        this.props.deleteWorkout(this.props.workout);

        this.toggle();
    }

    onUpdate = (e) => {
        window.location.reload();

        const newWorkout = {
            _id: this.props.workout._id,
            name: this.state.name,
            primary: this.state.primary,
            secondary: this.state.secondary,
            instructions: this.state.instructions
        }; 

        this.props.updateWorkout(newWorkout)

        this.toggle();
    }

    render() {
        return (
            <div>
                <Button
                    color="warning"
                    onClick={this.toggle}
                    size="sm"
                    className="custom-button"
                    style={{marginLeft: "1em"}}
                >Edit</Button>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Edit Workout</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="workoutName">Name</Label>
                                <Input 
                                    type="text"
                                    name="name"
                                    id="workoutName"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                />
                                
                                <Label for="primary">Primary</Label>
                                <Input 
                                    type="text"
                                    name="primary"
                                    id="primary"
                                    value={this.state.primary}
                                    onChange={this.onChange}
                                />
                                
                                <Label for="secondary">Secondary</Label>
                                <Input 
                                    type="text"
                                    name="secondary"
                                    id="secondary"
                                    value={this.state.secondary}
                                    onChange={this.onChange}
                                />

                                <Label for="instructions">Instructions</Label>
                                <Input 
                                    type="textarea"
                                    name="instructions"
                                    id="instructions"
                                    value={this.state.instructions}
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="danger"
                            onClick={this.onDelete}
                            >Delete
                        </Button>
                        <Button
                            color="warning"
                            onClick={this.onUpdate}
                            >Update
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const mapDispatchProps = (dispatch) => bindActionCreators({ deleteWorkout, updateWorkout }, dispatch)

export default connect(null, mapDispatchProps)(WorkoutModal);