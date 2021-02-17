import React, { Component } from 'react'; 
import { useHistory } from 'react-router-dom';
import firebase from 'firebase'
import axios from 'axios'
import {Button, Container, Table} from 'reactstrap';


class Clients extends Component {
    state ={
        clients: []
    }
    componentDidMount(){
        axios.get('http://localhost:5000/trainer/subscribers/UuZEdSMTPMTTPREacyK2oqVtQ142')
        .then((res) => {
            this.setState({clients: res.data})
        })
    }

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
                    {this.state.clients.map((client) =>
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
//const Clients = (props) => { 
//    return ( 
//
//      <div> 
//            <h1>hello WORLD</h1>
//        </div>
//    );
//}

export default Clients;