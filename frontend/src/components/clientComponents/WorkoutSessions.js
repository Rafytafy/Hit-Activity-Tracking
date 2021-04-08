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

    const [value, onChange] = useState(new Date()),
          [completedWorkoutsOfWeek, setCompletedWorkoutsOfWeek] = useState(0)

    useEffect(() => {
            axios.get(`http://localhost:5000/subscriber/${id}`)
            .then((res) => {
                props.setCurrentClient(res.data)
            })
        
      }, [completedWorkoutsOfWeek]);

    const renderGraphData = (session) => {
        let data = [["time", "value"]]
        for(let i = 0; i < session.heartrate.length; i++){
            data = [...data, [session.heartrate[i].time, session.heartrate[i].value]]   
        }
        return data
    }

    const renderGraph = (session) => {
        
        if(moment(value).isoWeek() == moment(session.date).isoWeek()){
        
        return (
                <>
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
                    <h5>Target heart rate: {Math.floor((220 - calculateAge()) * (session.routine.targetHeartrate / 100))}</h5>
                    <h5>Actual heart rate: {calculateMaxHeartrateReached(session.heartrate)}</h5>   
                </>
            )
        }
    }
    
    const calculateAge = () => {
      var today = new Date();
      var cDay = today.getDate();
      var cMonth = today.getMonth();
      var cYear = today.getFullYear();
      var todayDate = new Date(cYear, cMonth, cDay);
      var birth = new Date(props.client.birthdate);
      var diff = Math.abs(todayDate - birth);
      const age = Math.floor(diff / 31536000000);
      return age
    }
    
    const calculateMaxHeartrateReached = (heartrates) => {
        let maxFound = heartrates[0].value
        for(let i = 0; i < heartrates.length; i++){
            if(maxFound < heartrates[i].value){
                maxFound = heartrates[i].value
            }
        }
        return maxFound
    }

    return (
        <Container className="container-fluid">
            <Jumbotron className="mt-3">
                <h1>Workout Sessions</h1>
                <div>
                    <Calendar
                        onChange={(selectedDate) => {
                            onChange(selectedDate)
                        }}
                        value={value}
                    />
                </div>
                <h3>Week of: {value.toString()}</h3>
                <h3></h3>
                <hr />
                {
                props.client.workoutSessions !== undefined ?
                (
                props.client.workoutSessions.map((session) => (
                    <>
                            {renderGraph(session)}
                    </>
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