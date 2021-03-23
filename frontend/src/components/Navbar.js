import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import Pulse from './Pulse.png';
import firebase from 'firebase'; 
import { useHistory, Link } from 'react-router-dom';

const NavBar = (props) => {
  const history = useHistory(); 
  const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    
    const signOut = () => { 
      firebase.auth().signOut().then(() => {
        history.push('/');
  // Sign-out successful.
        }).catch((error) => {
          
  // An error happened.
});

 
    }
  return (
      <div>
      
      <Navbar className="color.nav" variant="dark" expand="md">
        <Link to="/">
          <NavbarBrand className='brand'>
            <img src={Pulse} alt="Logo"/>
            Pulse PT
        </NavbarBrand>
        </Link>
        
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink>
                <Link to="/Clients" className='inactive'> Clients</Link>
                </NavLink>
            </NavItem>
            <NavItem>
              <NavLink> 
               <Link to="/Profile" className='inactive'> Profile</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link onClick = {signOut} className = 'inactive'> Sign Out </Link>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;