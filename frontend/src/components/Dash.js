import React, { useState, useEffect} from 'react'; 
import { useHistory } from 'react-router-dom';
import { Row, Button, Col} from 'reactstrap';
import {connect} from 'react-redux'
import ProfileInfo from './profileComponents/ProfileInfo';
import axios from 'axios';
import firebase from 'firebase';

const Dash = (props) => {
    
    const history = useHistory();
    const [img, setImg] = useState("");

    const toClients = () => { history.push('/Clients') }
    const toRoutines = () => { history.push('/Routines') }
    const toWorkouts = () => { history.push('/workouts') }
    
    useEffect(() => {
        const uid = firebase.auth().currentUser.uid;
        axios.get(`http://localhost:5000/trainer/${uid}`).then((res) => {
            console.log(res);
            try {
                setImg(res.data[0].profilePicURL)
            }
            catch (e)
            {
                console.error(e);
            }
            
        })
    }, []);
    return ( 
        <div> 
            <div className="topDash">
                <Row className="fixRow">
                    <ProfileInfo profilePath={img} className = "profilePic" />
                    
                    <div className="greeting">
                        <h1> Trainer Dashboard
                    <br />
                        <h2> Hi {props.currentUser.name.firstName}, Welcome back! </h2>
                    </h1>
                    </div>
                    
                </Row>
                
            </div>
                <div className = "dash">
                    <Row>
                    <div className="dashDivider"/>
                    <Button className="shadow-lg" size="lg" onClick = { toClients }> 
                        <h1>Clients</h1>
                    </Button>
                    <div className="dashDivider" />
                    <div className="routineButton">
                    <Button className="shadow-lg" onClick={toRoutines}>
                            <h1>Routines</h1>
                        </Button>
                    </div>
                    <div className = "dashDivider"/>
                    <Button className="shadow-lg" onClick = { toWorkouts }> 
                        <h1> Workouts</h1>
                    </Button>
                    </Row> 
                </div>
            </div>
    );
}

const mapStateToProps = (store) => ({
    currentUser: store.user.data[0]
})

export default  connect(mapStateToProps, null)(Dash);