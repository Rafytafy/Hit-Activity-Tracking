import React, { Component } from 'react';
import { deleteWorkout, updateWorkout } from '../../redux/actions/index';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import blank from '../../images/1x1.png';
import {
    Button, Modal, ModalHeader, ModalBody, Form, ModalFooter,
    FormGroup,
    Label,
    Input,
    Row,
} from 'reactstrap';
import firebase from 'firebase'

class WorkoutModal extends Component {
    
    state = {
        modal: false,
        name: this.props.workout.name,
        primary: this.props.workout.primary,
        secondary: this.props.workout.secondary,
        instructions: this.props.workout.instructions,
        imageURL: this.props.workout.imageURL,
        videoURL: this.props.workout.videoURL
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
            instructions: this.state.instructions,
            imageURL: this.state.imageURL,
            videoURL: this.state.videoURL
        }; 

        this.props.updateWorkout(newWorkout)

        this.toggle();
    }

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
                                    value={this.state.instructions}
                                    onChange={this.onChange}
                                />
                                <Row> </Row>
                                <Label for="picture"> Add Media </Label>
                                <Row> </Row>
                                <label className="custom-file-upload"> 
                                Change Image
                                </label>
                                <Input type="file" onChange={this.setPicture} />
                                {" "} &nbsp; {" "} &nbsp;
                                <label className="custom-file-upload">
                                <Input type="file" onChange={this.setGif} />
                                 Change GIF
                                </label>
                                
                                <Row></Row>
                                <img src={this.state.imageURL} 
                                    onError={(e)=>{e.target.onerror = null; e.target.src= blank}} style={{height:'100px', width:'100px'}}/>
                                <Label for="gif"/>
                                {" "} &nbsp; {" "} &nbsp; {" "} &nbsp; {" "} &nbsp;
                                <img src={this.state.videoURL} 
                                    className="setMedia" onError={(e)=>{e.target.onerror = null; e.target.src= blank }} style={{height:'100px', width:'100px'}}/>                               
                                
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