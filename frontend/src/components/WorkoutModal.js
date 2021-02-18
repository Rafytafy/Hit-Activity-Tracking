import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap'

class WorkoutModal extends Component {
    
    state = {
        modal: false,
        name: '',
        primary: '',
        secondary: ''
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


        const newRobot = {
            name: this.state.name,
            type: this.state.type
        };

        //Add item via addItem action 
        
         this.props.addRobot(newRobot)

         //Close modal
         this.toggle();
    };

    render() {
        return (
            <div>
                <Button
                    color="dark"
                    onClick={this.toggle}
                    className="custom-button"
                >Create Workout</Button>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Create Workout</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="robotName">Name</Label>
                                <Input 
                                    type="text"
                                    name="name"
                                    id="robotName"
                                    placeholder="Enter name of Workout"
                                    onChange={this.onChange}
                                />
                                
                                <Label for="robotName">Primary</Label>
                                <Input 
                                    type="text"
                                    name="name"
                                    id="robotName"
                                    placeholder="Enter muscle group"
                                    onChange={this.onChange}
                                />
                                
                                <Label for="robotName">Secondary</Label>
                                <Input 
                                    type="textarea"
                                    name="name"
                                    id="robotName"
                                    placeholder="Enter muscle group"
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

export default WorkoutModal;