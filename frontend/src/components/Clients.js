import React, { Component } from 'react'; 
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
import {fetchClients, fetchCurrentUser} from '../redux/actions/index'
import { Container, Table} from 'reactstrap';

class Clients extends Component {
    
    componentWillReceiveProps(prevProps){
        if(prevProps.currentUser.uid !== this.props.currentUser.uid){
            console.log(prevProps.currentUser.uid)
            this.props.fetchClients(prevProps.currentUser.uid)
        }
    }
    
    render() {
        return (
            <div>
                <Container>
                    <h2>Clients</h2>
                    <Table>
                        <thead>
                            <th>Client Name</th>
                            <th>Email</th>
                            <th>Weight</th>
                        </thead>
                        <tbody>
                        {this.props.clients.map((client) =>
                            <tr key={client._id}>
                                <th>{client.name.lastName}, {client.name.firstName}</th>
                                <th>{client.email}</th>
                                <th>{client.weight}lbs</th>
                            </tr>
                            )}
                        </tbody>
                    </Table>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (store) => ({
    clients: store.clients.list,
    currentUser: store.user.data[0]
})

const mapDispatchProps = (dispatch) => bindActionCreators({fetchClients, fetchCurrentUser}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Clients);