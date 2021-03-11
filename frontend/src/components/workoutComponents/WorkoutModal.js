import React, { Component } from 'react';
import { postWorkouts } from '../../redux/actions/index';
import { bindActionCreators } from 'redux';
import firebase from 'firebase';
import { connect } from 'react-redux';

import {
    Button, Modal, ModalHeader, ModalBody, Form,
    FormGroup,
    Label,
    Input,
    Row
} from 'reactstrap';

class WorkoutModal extends Component {
    
    state = {
        modal: false,
        name: '',
        primary: '',
        secondary: '',
        instructions: '',
        imageURL: ''
    }
    
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    };
    setPicture = (e) => { 
        let file = e.target.files[0];
        let storageRef = firebase.storage().ref('workout_photos/' + file.name);
        storageRef.put(file)
        .then(async (snapshot) => {
            let imgPath = snapshot.metadata.fullPath
            console.log(snapshot);
            this.setState({ imageURL: imgPath })
            firebase.storage().ref(imgPath).getDownloadURL().then((url) => {
            this.setState({ imageURL: url})
            })
    })
        
        
    
    }
    onSubmit = (e) => {
        window.location.reload();
        e.preventDefault()
        const newWorkout = {
            name: this.state.name,
            primary: this.state.primary,
            secondary: this.state.secondary,
            instructions: this.state.instructions,
            imageURL: this.state.imageURL,
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
                                <Label for="picture"> Add Image </Label>
                                <Row> </Row>
                                <label className="custom-file-upload">
                                <Input type="file" onChange={this.setPicture} />
                                 Choose Image
                                </label>
                                <img src={this.state.imageURL} alt="text" style={{height:'100px', width:'100px'}}/>
                    
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