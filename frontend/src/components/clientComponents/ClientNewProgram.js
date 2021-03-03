import React from 'react'
import {connect} from 'react-redux'
import { Jumbotron, Container, Input } from 'reactstrap'


function ClientNewProgram(props) {
    return (
        <div>
            <Container>
                <Jumbotron>
                    <h1 className="display-4">Create Program for {props.client.name.firstName}</h1>
                    <h3>Select routines for program</h3>
                    <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                        {props.routines.map((routine) => 
                            <option value={routine.name}>{routine.name}</option>
                        )}
                    </Input> 
                </Jumbotron>
            </Container>
        </div>
    )
}

const mapStateToProps = (store) => ({
    client: store.clients.currentClient,
    routines: store.routines.list
})

export default connect(mapStateToProps, null)(ClientNewProgram)