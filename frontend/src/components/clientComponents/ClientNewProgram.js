import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
import {createProgram} from '../../redux/actions/index'
import { Jumbotron, Container, Input, Button, ListGroup, ListGroupItem, FormGroup, Row } from 'reactstrap'


function ClientNewProgram(props) {
    const history = useHistory();

    const [selectedRoutine, setSelectedRoutine] = useState({}),
          [selectedRoutinesForProgram, setSelectedRoutinesForProgram] = useState([]);

    const findRoutineInArray = (e) =>{
        props.routines.map((routine) => {
            if(routine.name == e.target.value){
                setSelectedRoutine(routine)
            }
        })
    }
    
    const addRoutineToList = () =>{
        setSelectedRoutinesForProgram([...selectedRoutinesForProgram, selectedRoutine])
        setSelectedRoutine({}); 
    }

    const removeFromWorkoutPlanArray = (routine) => {
        let newArr = selectedRoutinesForProgram.filter((item) => routine.name !== item.name)
        setSelectedRoutinesForProgram(newArr);
    }

    const onCreateProgram = () =>{
        
        let clientWithNewProgram = props.client;
        clientWithNewProgram.routines = selectedRoutinesForProgram
        console.log(clientWithNewProgram)
        props.createProgram(clientWithNewProgram)
        history.push('/clientDetails')
          
    }

    return (
        <div>
            <Container>
                <Jumbotron>
                    <h1 className="display-4">Create Program for {props.client.name.firstName}</h1>
                    <FormGroup className="clearfix">
                        <h3>Select routines for program</h3>
                        <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple onChange={ (e) => findRoutineInArray(e)}>
                            {props.routines.map((routine) => 
                                <option value={routine.name}>{routine.name}</option>
                            )}
                        </Input>
                        <Button  className="float-right mt-3" onClick={() => addRoutineToList()}>Add To Program</Button> 
                    </FormGroup>
                    <hr className="my-2" />
                    <ListGroup>
                        {selectedRoutinesForProgram.map((routine) =>
                            <Row>
                                <ListGroupItem>{routine.name}</ListGroupItem>
                                <Button color="danger" size="lg" onClick={() => removeFromWorkoutPlanArray(routine)}>X</Button>
                            </Row>
                        )}
                    </ListGroup>
                    {selectedRoutinesForProgram.length > 0 ?
                        <Button color="success" className="float-right" onClick={() => onCreateProgram()}>Create Program</Button>
                        :
                        <></>
                    }

                </Jumbotron>
            </Container>
        </div>
    )
}

const mapStateToProps = (store) => ({
    client: store.clients.currentClient,
    routines: store.routines.list
})

const mapDispatchProps = (dispatch) => bindActionCreators({ createProgram }, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(ClientNewProgram)