import React, {useState, useEffect} from 'react'; 
import firebase from 'firebase'
import { Input } from 'reactstrap';
import axios from 'axios';
import ProfilePic from './ProfilePic';
import { Row } from 'reactstrap';
const Edit = (props) => {
    const [img, setImg] = useState("");

    const uid = firebase.auth().currentUser.uid;
    
    useEffect(() => {
        axios.get(`http://localhost:5000/trainer/${uid}`).then((res) => {
            console.log(res);
        setImg(res.data[0].profilePicURL)
            
        })
        
    },[]);
        
    const pickFile = (e) => {
        console.log("hello")
        let file = e.target.files[0];
        let storageRef = firebase.storage().ref('trainer_photos/' + file.name);
        storageRef.put(file)
            
            .then(async (snapshot) => {
            let profilePath = snapshot.metadata.fullPath
            console.log(snapshot);
                console.log(uid);
                setImg(profilePath)
                axios.put(`http://localhost:5000/trainer/profilePicture/${uid}`, { path: profilePath })
                
                .then((res) => {
                    console.log(res);
                    
                })
            
                .catch((error) => {
                console.log(error)
      })
    })
      }    
    
    return (
        <div className="edit">
            <Row> 
                <h1> Set Profile Picture </h1>
            </Row>
                <label className="custom-file-upload">
                    <Input type="file" onChange={pickFile} />
                    Choose Profile Picture
                </label>
            <Row>
                <ProfilePic profilePath = {img} />
            </Row>
           
                
            </div>
        );
    
}
export default Edit;

