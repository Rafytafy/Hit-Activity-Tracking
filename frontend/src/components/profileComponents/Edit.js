import React, {useState, useEffect,} from 'react'; 
import firebase from 'firebase'
import axios from 'axios';
import ProfileInfo from './ProfileInfo';
import { Row, Form, FormGroup, Input, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DefaultPicture from '../../images/default-profile-picture.png'

const Edit = (props) => {
    const uid = firebase.auth().currentUser.uid;
    const [img, setImg] =  useState("");
    const [location, setLocation] = useState("");
    const [plans, setPlans] = useState("");
    const [socials, setSocials] = useState("");
    const [bio, setBio] = useState("");
    const [modal, setModal] = useState(false)
    
    const toggle = () => setModal(!modal)

    useEffect(() => {
        axios.get(`http://localhost:5000/trainer/${uid}`).then((res) => {
            console.log(res);
        setImg(res.data[0].profilePicURL)
            
        })
        
    }, []);
    const onChange = (e) => {
        switch (e.target.name) {
            case "location":
                setLocation(e.target.value)
                break;
            case "plans":
                setPlans(e.target.value)
                break;
            case "socials":
                setSocials(e.target.value)
                break;
            case "bio":
                setBio(e.target.value)
                break;
            default: console.log("u suck")
        }   
    }
    const onSubmit = (e) => {
        
        axios.put(`http://localhost:5000/trainer/${uid}`, {bio, location, socials, plans}).then((res) => {
            console.log(res);
            window.location.reload();
        })
       
    }
    function pickFile(e) {
            console.log("hello");
            let file = e.target.files[0];
            let storageRef = firebase.storage().ref('trainer_photos/' + file.name);
            storageRef.put(file)

                .then(async (snapshot) => {
                    let profilePath = snapshot.metadata.fullPath;
                    console.log(snapshot);
                    console.log(uid);
                    setImg(profilePath);
                    axios.put(`http://localhost:5000/trainer/profilePicture/${uid}`, { path: profilePath })

                        .then((res) => {
                            console.log(res);

                        })

                        .catch((error) => {
                            console.log(error);
                        });
                });
        }    
    return (
        <div>
            <Button color = "secondary" onClick={toggle}> Edit Profile </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit Profile </ModalHeader>
                <ModalBody> 
            <Form onSubmit = {onSubmit}>
            <FormGroup>
                <label className="custom-file-upload">
                    <Input type="file" onChange={pickFile} />
                    Choose Profile Picture
                </label>
            <Row>
                <ProfileInfo profilePath = {img} />
                    </Row>
            <Label for="locationName">Location</Label>
                                <Input 
                                    type="text"
                                    name="location"
                                    id="locationName"
                                    placeholder="Enter Location"
                                    onChange={onChange}
                    />
            <Label for="socialName">Socials</Label>
                                <Input 
                                    type="textarea"
                                    name="socials"
                                    id="socialName"
                                    placeholder="Enter Socials"
                        onChange={onChange}
                        
                    />
                    <Label for="workoutPlans"> Workout Plans</Label>
                                <Input 
                                    type="text"
                                    name="plans"
                                    id="planName"
                                    placeholder="Enter Workout Plans"
                        onChange={onChange}
                    />
                    <Label for="bio"> Bio</Label>
                                <Input 
                                    type="textarea"
                                    name="bio"
                                    id="bioName"
                                    placeholder="Enter Bio"
                        onChange={onChange}
                    />
             </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter> 
            <Button
                    color="dark"
                    onClick={onSubmit}
                    style={{margin:".25em 0 1em 1em"}}
                    >Save Profile</Button>
                </ModalFooter>
            </Modal>
            </div>
        );
    
}

export default Edit;