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
        imageURL: '',
        videoURL: ''
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
    setGif = (e) => { 
        let file = e.target.files[0];
        let storageRef = firebase.storage().ref('workout_gifs/' + file.name);
        storageRef.put(file)
        .then(async (snapshot) => {
            let vidPath = snapshot.metadata.fullPath
            console.log(snapshot);
            this.setState({ videoURL: vidPath })
            firebase.storage().ref(vidPath).getDownloadURL().then((url) => {
            this.setState({ videoURL: url})
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
            videoURL: this.state.videoURL
        };
 

        //Add item via addItem action 
        console.log("Hello from modal")
        this.props.postWorkouts(newWorkout)

         this.toggle();
    };

   
    render() {
        return (
            <div>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
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
                                    type="select"
                                    name="primary"
                                    id="primary"
                                    placeholder="Enter muscle group"
                                    onChange={this.onChange}>
                                        <option value="" disabled selected>Main muscle group</option>
                                        <option value="Full Body">Full Body</option>
                                        <option value="Upper Body">Upper Body</option>
                                        <option value="Lower Body">Lower Body</option>
                                        <option value="Arms">Arms</option>
                                        <option value="Biceps">Biceps</option>
                                        <option value="Triceps">Triceps</option>
                                        <option value="Forearms">Forearms</option>
                                        <option value="Core">Core</option>
                                        <option value="Abs">Abs</option>
                                        <option value="Obliques">Obliques</option>
                                        <option value="Back">Back</option>
                                        <option value="Upper Back">Back (Upper)</option>
                                        <option value="Lower Back">Back (Lower)</option>
                                        <option value="Chest">Chest</option>
                                        <option value="Upper Chest">Chest (Upper)</option>
                                        <option value="Lower Chest">Chest (Lower)</option>
                                        <option value="Shoulders">Shoulders</option>
                                        <option value="Deltoids">Deltoids</option>
                                        <option value="Traps">Traps</option>
                                        <option value="Glutes">Glutes</option>
                                        <option value="Hamstrings">Hamstrings</option>
                                        <option value="Quadriceps">Quadriceps</option>
                                        <option value="Calves">Calves</option>
                                    <br/>
                                </Input>
                                    
                            
                            <Label for="secondary">Secondary</Label>
                                <Input 
                                    type="select"
                                    name="secondary"
                                    id="secondary"
                                    placeholder="Enter muscle group"
                                    onChange={this.onChange}>
                                        <option value="" disabled selected>Secondary muscle group</option>
                                        <option value="Full Body">Full Body</option>
                                        <option value="Upper Body">Upper Body</option>
                                        <option value="Lower Body">Lower Body</option>
                                        <option value="Arms">Arms</option>
                                        <option value="Biceps">Biceps</option>
                                        <option value="Triceps">Triceps</option>
                                        <option value="Forearms">Forearms</option>
                                        <option value="Core">Core</option>
                                        <option value="Abs">Abs</option>
                                        <option value="Obliques">Obliques</option>
                                        <option value="Back">Back</option>
                                        <option value="Upper Back">Back (Upper)</option>
                                        <option value="Lower Back">Back (Lower)</option>
                                        <option value="Chest">Chest</option>
                                        <option value="Upper Chest">Chest (Upper)</option>
                                        <option value="Lower Chest">Chest (Lower)</option>
                                        <option value="Shoulders">Shoulders</option>
                                        <option value="Deltoids">Deltoids</option>
                                        <option value="Traps">Traps</option>
                                        <option value="Glutes">Glutes</option>
                                        <option value="Hamstrings">Hamstrings</option>
                                        <option value="Quadriceps">Quadriceps</option>
                                        <option value="Calves">Calves</option>
                                    <br/>
                                </Input>

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
                            <Label for="gif"> Add GIF </Label>
                                <Row> </Row>
                                <label className="custom-file-upload">
                                <Input type="file" onChange={this.setGif} />
                                 Choose GIF
                                </label>
                                <img src={this.state.videoURL} alt="text" style={{height:'100px', width:'100px'}}/>
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