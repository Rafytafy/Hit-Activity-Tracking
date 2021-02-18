import React, { Component } from 'react'
import { Container, Table } from 'reactstrap'
import  WorkoutModal  from './WorkoutModal'

export default class Workouts extends Component {
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
                        <tr>
                            <th>Push up</th>
                            <th>Chest</th>
                            <th>Arms</th>
                        </tr>
                    </tbody>
                </Table>
                </div>
            </Container>
        )
    }
}
