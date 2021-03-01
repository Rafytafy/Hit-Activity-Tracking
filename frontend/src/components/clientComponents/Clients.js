import React, { Component } from 'react'; 
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
import {fetchClients, fetchCurrentUser, setCurrentClient} from '../../redux/actions/index'
import { Container, Table, Button} from 'reactstrap';
import {withRouter} from 'react-router-dom';




class Clients extends Component {
    
    componentDidMount(){
        if(this.props.clients.length === 0){
            this.props.fetchClients(this.props.currentUser.uid)
        }
    }

    componentWillReceiveProps(prevProps){
        if(prevProps.currentUser.uid !== this.props.currentUser.uid){
            this.props.fetchClients(prevProps.currentUser.uid)
        }
    }
    toClientDetails() { 
        this.props.history.push('/clientDetails') 
    }
    toClientDetailPage (client){
            this.props.setCurrentClient(client)
             this.toClientDetails()
        }

    render() {
         
        return (
            <div>
                <Container>
                    <h2>Clients</h2>
                    <Table>
                        <thead>
                            <th>Activity</th>
                            <th>Client Name</th>
                            <th>Email</th>
                            <th>Weight</th>
                        </thead>
                        <tbody>
                        {this.props.clients.map((client) =>
                            <tr key={client._id}>
                                <th><Button onClick={() => this.toClientDetailPage(client)}> View </Button></th>
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

const mapDispatchProps = (dispatch) => bindActionCreators({fetchClients, fetchCurrentUser, setCurrentClient}, dispatch)

export default withRouter(connect( mapStateToProps, mapDispatchProps)(Clients));