import React, { Component } from 'react'; 
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
import {fetchClients, fetchCurrentUser, setCurrentClient} from '../../redux/actions/index'
import { Container, Table, Button} from 'reactstrap';
import {withRouter} from 'react-router-dom';




class Clients extends Component {
    
    componentDidMount(){
        //1 becuase default length in client list is one
        if(this.props.clients.length === 1){
            this.props.fetchClients(this.props.currentUser.uid)
        }
    }

    componentWillReceiveProps(prevProps){
        if(prevProps.currentUser.uid !== this.props.currentUser.uid){
            this.props.fetchClients(prevProps.currentUser.uid)
        }
    }
    toClientDetails(id) { 
        this.props.history.push(`/clientDetails/${id}`) 
    }
    toClientDetailPage (client){
            this.props.setCurrentClient(client)
             this.toClientDetails(client._id)
        }

    renderClientsTable(){
        if(this.props.clients !== undefined){
            return (
                this.props.clients.map((client) =>
                    <tr key={client._id}>
                        <th><Button onClick={() => this.toClientDetailPage(client)}> View </Button></th>
                        <th>{client.name.lastName}, {client.name.firstName}</th>
                        <th>{client.email}</th>
                        <th>{client.weights[client.weights.length - 1].weight}lbs</th>
                    </tr>
                    )
            )
        }
        else{
            <></>
        }
    }

    render() {
         
        return (
            <div className="clients">
                <Container>
                    <h1>Clients</h1>
                    <Table>
                        <thead>
                            <th>Activity</th>
                            <th>Client Name</th>
                            <th>Email</th>
                            <th>Weight</th>
                        </thead>
                        <tbody>
                        {this.renderClientsTable()}
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