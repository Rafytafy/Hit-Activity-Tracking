import React, { Component } from 'react'
import { Container, Table } from 'reactstrap'
import {connect} from 'react-redux'
import  WorkoutModal  from './WorkoutModal'

class Workouts extends Component {
    componentWillReceiveProps(nextProps){
        if(nextProps.newWorkout.name !== this.props.newWorkout.name){
            this.props.workouts.push(nextProps.newWorkout)
        }
    }
    
    render() {
        return (
            <Container>
                <div>
                <h2>Workouts</h2>
                <WorkoutModal />
                <Table>
                    <thead>
                        <th>Name</th>
                        <th>Primary</th>
                        <th>Secondary</th>
                    </thead>
                    <tbody>
                    {this.props.workouts.map((workout) =>
                            <tr key={workout._id}>
                                <th>{workout.name}</th>
                                <th>{workout.primary}</th>
                                <th>{workout.secondary}</th>
                            </tr>
                            )}
                        <tr>
                        </tr>
                    </tbody>
                </Table>
                </div>
            </Container>
        )
    }
}

const mapStateToProps = (store) => ({
    workouts: store.workouts.list,
    newWorkout: store.workouts.workout
})


export default connect(mapStateToProps, null)(Workouts)