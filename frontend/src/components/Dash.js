import React from 'react'; 
import { useHistory } from 'react-router-dom';
import { Row, Button, Col} from 'reactstrap';
import {connect} from 'react-redux'
import DefaultPicture from '../images/default-profile-picture.png'

const Dash = (props) => {
    
    const history = useHistory();   

    const toClients = () => { history.push('/Clients') }
    const toMessages = () => { history.push('/Messages') }
    const toRoutines = () => { history.push('/Routines') }
    const toWorkouts = () => { history.push('/workouts') }
    
    return ( 
        <div> 
            <div className="topDash">
                <Row className = "fixRow">
                    <img src={DefaultPicture} style={{ width: '15em' }} alt="Logo" />
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

                    <Button className="shaded shadow-lg" onClick = {toMessages} > 
                        <h1>Messages</h1>
                    </Button>
                    <div className="dashDivider"/>
                    <Button className="shaded shadow-lg" size="lg" onClick = { toClients }> 
                        <h1>Clients</h1>
                    </Button>
                        <div className = "dashDivider"/>
                    <Button className="shaded shadow-lg" onClick = { toRoutines }> 
                        <h1>Routines</h1>
                    </Button>
                    <div className = "dashDivider"/>
                    <Button className="shaded shadow-lg" onClick = { toWorkouts }> 
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