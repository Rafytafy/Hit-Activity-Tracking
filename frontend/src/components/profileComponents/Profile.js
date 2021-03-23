import React, { useEffect, useState } from 'react'; 
import { Jumbotron } from 'reactstrap';
import axios from 'axios'; 
import firebase from 'firebase'; 
import ProfileInfo from './ProfileInfo';
import { connect } from 'react-redux';
import Edit from './Edit';
import DefaultPicture from '../../images/default-profile-picture.png'

const Profile = (props) => 
{
    const [img, setImg] = useState("");
    const [location, setLocation] = useState("");
    const [plans, setPlans] = useState("");
    const [socials, setSocials] = useState("");
    const [bio, setBio] = useState("");

    const uid = firebase.auth().currentUser.uid;

    useEffect(() => {
        axios.get(`http://localhost:5000/trainer/${uid}`).then((res) => {
            console.log(res);
        setImg(res.data[0].profilePicURL)
        setLocation(res.data[0].location)
        setPlans(res.data[0].plans)
        setBio(res.data[0].bio)
        setSocials(res.data[0].socials) 
        })
        
    },[]);

    return (
        <div className="jumbo">
            
            <Jumbotron>
                
                <ProfileInfo profilePath={img} />
                <p> </p>
                <h1>  </h1>
                <h2> Trainer location </h2>
                <h4> {location} </h4>
                <h2> Socials </h2>
                <h4> {socials} </h4>
                <hr />
                <h2> Workout Plans </h2>
                <h4> {plans} </h4>
                <h3> Bio </h3>
                <p> {bio} </p>
                <Edit />
            </Jumbotron>
           
       </div>
    );

    
}

const mapStateToProps = (store) => ({
    currentUser: store.user.data[0]
})

export default  connect(mapStateToProps, null)(Profile);