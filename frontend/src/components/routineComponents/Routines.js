import React, { Component } from 'react'
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
import {setCurrentRoutine} from '../../redux/actions/index'
import { Container, Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap'

function Routines(props) {

    const history = useHistory();   
    const toRoutineDetails = (id) => { history.push(`/routineDetails/${id}`) }
    const toCreateRoutine = () => {history.push('/createRoutine')}

    const calculateDuration = (arr) =>{
        let totalDuration = 0
        for(let i = 0; i < arr.length; i++){
            totalDuration += arr[i].duration;
        }
        return totalDuration
    }
    
    const toRoutineDetailPage = (routine) =>{
        props.setCurrentRoutine(routine)
        toRoutineDetails(routine._id)
    }

    const toCreateNewRoutinePage = () => {
        toCreateRoutine()
    }

    
    return (
        <div>
            <Container className='routines'>
                <h1>Your Routines</h1>
                <Row xs = '4'>
                {props.routines.map((routine) =>
                    <Col xs ='12' sm='6' md='4' className="mb-4">
                        <Card className="shadow">
                            <CardBody>
                                <CardTitle tag="h5">{routine.name}</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Duration: {calculateDuration(routine.workouts)}</CardSubtitle>
                                <CardText></CardText>
                                <Button onClick={() => toRoutineDetailPage(routine)}>View</Button>
                            </CardBody>
                        </Card>                    
                    </Col>                        
                )}
                <Col xs="4" className="d-flex justify-content-center align-items-center">
                    <Button size="lg" onClick={() => toCreateNewRoutinePage()}>Create new routine</Button>
                </Col>
                </Row>
            </Container>
        </div>
        )
    
}

const mapStateToProps = (store) => ({
    routines: store.routines.list,
})

const mapDispatchProps = (dispatch) => bindActionCreators({setCurrentRoutine}, dispatch)


export default connect(mapStateToProps, mapDispatchProps)(Routines)