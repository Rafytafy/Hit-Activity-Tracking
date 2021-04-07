import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import Chart from "react-google-charts";
import {Jumbotron, Container, Button} from 'reactstrap';
import {useHistory, useParams} from 'react-router-dom';
import  { bindActionCreators } from 'redux';
import {setCurrentClient} from '../../redux/actions/index';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';


function WorkoutSessions(props) {

    const history = useHistory();
    let { id } = useParams();

    const [value, onChange] = useState(new Date());

    useEffect(() => {
            axios.get(`http://localhost:5000/subscriber/${id}`)
            .then((res) => {
                props.setCurrentClient(res.data)
            })
        
      }, []);

    const renderGraphData = (session) => {
        let data = [["time", "value"]]
        for(let i = 0; i < session.heartrate.length; i++){
            data = [...data, [session.heartrate[i].time, session.heartrate[i].value]]   
        }
        return data
    }

    const renderGraph = (session) => {
        console.log(session)
        if(moment(value).isoWeek() == moment(session.date).isoWeek())
        return (<Chart
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
                        />)
    }

    return (
        <Container className="container-fluid">
            <Jumbotron className="mt-3">
                <h1>Workout Sessions</h1>
                <div>
                    <Calendar
                        onChange={(selectedDate) => {
                            onChange(selectedDate)
                            console.log(selectedDate)
                        }}
                        value={value}
                    />
                </div>
                <h3>Week of: {value.toString()}</h3>
                {/* {console.log(moment(value).isoWeek() == moment("2020-04-17GMT11:45:00Z").isoWeek())}         */}
                {
                props.client.workoutSessions !== undefined ?
                (
                props.client.workoutSessions.map((session) => (
                    
                    <div className="mt-5" style={{ display: 'flex', maxWidth: 1050 }}>
                        {renderGraph(session)}
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