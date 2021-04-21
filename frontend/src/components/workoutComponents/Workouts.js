import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
import { clearWorkoutState } from '../../redux/actions/index'
import  WorkoutModal  from './WorkoutModal'
import Detail from './Detail'
import Edit from './Edit'
import { Container, Col, Row, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap'
import DefaultPicture from '../../images/default-profile-picture.png'

class Workouts extends Component {
    componentWillReceiveProps(nextProps){
        if(nextProps.newWorkout.name !== this.props.newWorkout.name){
            this.props.workouts.push(nextProps.newWorkout)
        }
        if(nextProps.deletedWorkout.name !== this.props.deletedWorkout.name){
            let index = this.props.workouts.indexOf(nextProps.deletedWorkout)
            console.log(index)
            if(index !== -1){
                this.props.workouts.splice(index, 1)
                this.render()
            }
        }
    }
    
    render() {
        return (
            <Container className = "workout">
                    <div className="workouts">
                    
                     <h2>Workouts</h2>
                     <WorkoutModal />
                    </div>
                    <Row>
                    {this.props.workouts.map((workout) => 
                        
                        <Col xs="4" className="mb-3">
                            <Card className="shadow" >
                            <CardImg variant="bottom" src={workout.imageURL} /> 
                                <CardBody>
                                    <CardTitle tag="h5">{workout.name}</CardTitle>
                                    <CardSubtitle tag="h6">Primary: {workout.primary}
                                                <div/> Secondary: {workout.secondary}</CardSubtitle>
                                    <CardText>
                                        <div style={{display: "flex"}}>
                                            <Detail workout={workout}/>
                                            <Edit workout={workout}/>
                                        </div>
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Col>   
                    )}
                    </Row>       
            </Container>
        )
    }
}

const mapStateToProps = (store) => ({
    workouts: store.workouts.list,
    newWorkout: store.workouts.workout,
    deletedWorkout: store.workouts.deletedWorkout,
    updatedWorkout: store.workouts.updatedWorkout
})

export default  connect(mapStateToProps, null)(Workouts)