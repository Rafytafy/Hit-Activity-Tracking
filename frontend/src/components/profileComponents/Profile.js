import React, { useEffect, useState } from 'react'; 
import { Row, Col, Container, Jumbotron } from 'reactstrap';
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
        <div className="profile">
            <Row className = "fixRow">
                <Col sm={{ size: 'auto', }}>
                    <ProfileInfo profilePath={img} className = "profilePic" />
                    {/* <img src={DefaultPicture} style={{ width: '15em' }} alt="Logo" /> */}
                </Col>
                
                    
                    <br />
                    <Container className = "profileInfo"> 
                    <Col> <h3> Trainer </h3>
            <h1> {props.currentUser.name.firstName} {props.currentUser.name.lastName}</h1>
                        <h4> {location} {socials} </h4>
                        <br />
                        <br/>
            <h4> {plans} </h4>

                <p> {bio} </p>
                        <Edit />
                    </Col>
                </Container>
                
                <Col className = "fixCol">
                    <div className="testimonials">
                        <h1> Testimonials </h1>
                    </div>
                    
                    <Jumbotron className = "bigJumbo">
                        
                    </Jumbotron>
            </Col>
                     <div className= "programs">
                    <h1> Programs </h1>
                    <br/>
                        <Row>
                        <Jumbotron className="jumbo">
                            
                            </Jumbotron>
                            <div className = "dashDivider"/>
                        <Jumbotron className = "jumbo">
                            </Jumbotron>
                            <div className = "dashDivider"/>
                            <Jumbotron className = "jumbo">
                            </Jumbotron>
                        </Row>
                        
                    </div>
                    
                   
                   
               
               
            </Row>
            
       </div>
    );

    
}

const mapStateToProps = (store) => ({
    currentUser: store.user.data[0]
})

export default  connect(mapStateToProps, null)(Profile);