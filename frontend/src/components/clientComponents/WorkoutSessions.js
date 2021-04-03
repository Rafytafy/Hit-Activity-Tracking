import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import Chart from "react-google-charts";
import {Jumbotron, Container, Button} from 'reactstrap';
import {useHistory, useParams} from 'react-router-dom';
import  { bindActionCreators } from 'redux';
import {setCurrentClient} from '../../redux/actions/index'


function WorkoutSessions(props) {

    const history = useHistory();
    let { id } = useParams();

    useEffect(() => {
        
            console.log("Hello")
            axios.get(`http://localhost:5000/subscriber/${id}`)
            .then((res) => {
                props.setCurrentClient(res.data)
                console.log(props.client)
            })
        
      }, []);

    const renderGraphData = (session) => {
        let data = [["time", "value"]]
        for(let i = 0; i < session.heartrate.length; i++){
            data = [...data, [session.heartrate[i].time, session.heartrate[i].value]]   
        }

        return data
    }

    return (
        <Container className="container-fluid">
            <Jumbotron className="mt-3">
                <h1>Workout Sessions</h1>        
                {
                props.client.workoutSessions ?
                (
                props.client.workoutSessions.map((session) => (
                    
                    <div className="mt-5" style={{ display: 'flex', maxWidth: 1050 }}>
                        <Chart
                            width={1050}
                            height={300}
                            chartType="LineChart"
                            loader={<div>Loading Chart</div>}
                            data={renderGraphData(session)}
                            options={{
                            title: `Routine: ${session.routine.name}\n Date: ${session.date.slice(0, 10)}`,
                            chartArea: { width: '90%' },
                            hAxis: {
                                title: 'Time',
                                minValue: 0,
                            },
                            vAxis: {
                                title: 'Heart Rate',
                            },
                            }}
                            legendToggle
                        />
                    </div>
                )))
                :
                <h1>Loading</h1>
                }
                <Button className="mt-3" onClick={() => history.push(`/clientDetails/${props.client._id}`)}>Back to Details</Button>
                
            </Jumbotron>
        </Container>
    )
}

const mapStateToProps = (store) => ({
    client: store.clients.currentClient
})

const mapDispatchProps = (dispatch) => bindActionCreators({ setCurrentClient }, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(WorkoutSessions)