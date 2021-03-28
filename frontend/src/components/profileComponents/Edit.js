import React, {useState, useEffect, state} from 'react'; 
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
    const [testimonials, setTestimonials] = useState("");
    const [modal, setModal] = useState(false)
    
    const toggle = () => setModal(!modal)

    useEffect(() => {
        axios.get(`http://localhost:5000/trainer/${uid}`).then((res) => {
            console.log(res);
            setImg(res.data[0].profilePicURL)
            setLocation(res.data[0].location)
            setBio(res.data[0].bio)
            setPlans(res.data[0].plans)
            setSocials(res.data[0].socials)
            setBio(res.data[0].bio)
            setTestimonials(res.data[0].testimonials)
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
            case "testimonials":
                setTestimonials(e.target.value)
                break;
            default: console.log("this works")
        }   
    }
    const onSubmit = () => {
        
        axios.put(`http://localhost:5000/trainer/${uid}`, {bio, location, socials, plans, testimonials}).then((res) => {
            console.log(res);
            
        })
        window.location.reload();
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
                                value={location}
                                    onChange={onChange}
                    />
            <Label for="socialName">Socials</Label>
                                <Input 
                                    type="textarea"
                                    name="socials"
                                id="socialName"
                                    value={socials}
                                    placeholder="Enter Socials"
                        onChange={onChange}
                        
                    />
                    <Label for="workoutPlans"> Workout Plans</Label>
                                <Input 
                                    type="text"
                                    name="plans"
                                id="planName"
                                    value={plans}
                                    placeholder="Enter Workout Plans"
                        onChange={onChange}
                    />
                    <Label for="bio"> Bio</Label>
                                <Input 
                                    type="textarea"
                                    name="bio"
                                id="bioName"
                                    value={bio}
                                    placeholder="Enter Bio"
                        onChange={onChange}
                            />
                             <Label for="testimonials"> Reviews </Label>
                            <Input
                                type="textarea"
                                name="testimonials"
                                id="testName"
                                placeholder="Enter reviews"
                                value={testimonials}
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