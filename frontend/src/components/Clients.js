import React, { Component } from 'react'; 
import {connect} from 'react-redux'
import { Container, Table} from 'reactstrap';

class Clients extends Component {
    render() {
        return (
            <div>
                <Container>
                    <h2>Clients</h2>
                    <Table>
                        <thread>
                            <th>Client Name</th>
                            <th>Email</th>
                            <th>Weight</th>
                        </thread>
                        {this.props.clients.map((client) =>
                            <tr key={client._id}>
                                <th>{client.name.lastName}, {client.name.firstName}</th>
                                <th>{client.email}</th>
                                <th>{client.weight}lbs</th>
                            </tr>
                            )}
                    </Table>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (store) => ({
    clients: store.clients.list
})

export default connect(mapStateToProps, null)(Clients);