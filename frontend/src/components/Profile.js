import React, { useEffect, useState } from 'react'; 
import { Jumbotron } from 'reactstrap';
import axios from 'axios'; 
import firebase from 'firebase'; 
import ProfilePic from './ProfilePic';
import { connect } from 'react-redux';
const Profile = (props) => 
{

    const [img, setImg] = useState("");
    const uid = firebase.auth().currentUser.uid;

    useEffect(() => {
        axios.get(`http://localhost:5000/trainer/${uid}`).then((res) => {
            console.log(res);
        setImg(res.data[0].profilePicURL)
            
        })
        
    },[]);

    return (
        <div className="jumbo">
            <Jumbotron>
                 <ProfilePic profilePath = {img} />
                <p> </p>
                <h1>  </h1>
                <h2> Trainer location, socials</h2>
                <hr/>
                <h2> Weight Loss, Diets, Workout Plans </h2>
                <h3> Bio </h3>
                <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum."
                 </p>
            </Jumbotron>
           
       </div>
    );

    
}

const mapStateToProps = (store) => ({
    currentUser: store.user.data[0]
})

export default  connect(mapStateToProps, null)(Profile);