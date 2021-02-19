import React, { Component } from 'react'
import { Container, Table } from 'reactstrap'
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
import { clearWorkoutState } from '../../redux/actions/index'
import  WorkoutModal  from './WorkoutModal'
import Detail from './Detail'
import Edit from './Edit'


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
            <Container>
                <div>
                <div style={{display: "flex"}}>
                    <h2>Workouts</h2>
                    <WorkoutModal />
                </div>
                <Table>
                    <thead>
                        <th>Name</th>
                        <th>Primary</th>
                        <th>Secondary</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                    {this.props.workouts.map((workout) =>
                            <tr key={workout._id}>
                                <th>{workout.name}</th>
                                <th>{workout.primary}</th>
                                <th>{workout.secondary}</th>
                                <th>
                                    <div style={{display: "flex", justifyContent: "left"}}>
                    
                                    
                                        <Detail workout={workout} />
                                        <Edit workout={workout}/>
                                    </div>
                                </th>
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
    newWorkout: store.workouts.workout,
    deletedWorkout: store.workouts.deletedWorkout,
    updatedWorkout: store.workouts.updatedWorkout
})

export default connect(mapStateToProps, null)(Workouts)