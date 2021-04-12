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
                    <div className="row mt-5">
                        <div className="col-sm">
                            {renderPieChart(session)}
                        </div>
                        <div className="col-sm d-flex align-items-center flex-column justify-content-center">
                            <h5>Target heart rate: {calculateTargetHeart(session.routine.targetHeartrate)}</h5>
                            <h5>Max heart rate reached: {calculateMaxHeartrateReached(session.heartrate)}</h5>
                            <h5>Average heaert: {calculateAverageHeartrate(session.heartrate)}</h5>
                        </div>
                    </div>
                    
                    <hr />  
                </>
            )
        }
    }
    
    const renderPieChart = (session) => {
        let data = [
            ['Heartrate', 'Instance above or below target'],
        ]
        let targetHeartrate = calculateTargetHeart(session.routine.targetHeartrate)

        data = populatePieChartData(session, data, targetHeartrate);

        return (
            <Chart
                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={data}
                options={{
                    title: 'Time Above Target Heart Rate',
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        )
    }

    const populatePieChartData = (session, data, targetHeartrate) =>{
       let aboveHeartRate = ['Above Target', 0];
       let belowHeartRate = ['Below Target', 0];
       
       for(let i = 0; i < session.heartrate.length; i++){
           if(session.heartrate[i].value >= targetHeartrate){
               aboveHeartRate[1] += 1;
           }
           else{
               belowHeartRate[1] += 1;
           }
       }

       data = [...data, aboveHeartRate, belowHeartRate]
       
       return data
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

    const calculateAverageHeartrate = (heartrates) => {
        let sum = 0;
        for(let i = 0; i < heartrates.length; i++){
            sum += heartrates[i].value
        }

        let average = Math.round(sum/(heartrates.length))
        return average
    }

    const calculateTargetHeart = (targetHeartrate) => {
        return Math.floor((220 - calculateAge()) * (targetHeartrate / 100))
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