import React, { useState, } from 'react';
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
  NavbarText
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
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});

 
    }
  return (
      <div>
      
      <Navbar color="light" light expand="md">
        
        <Link to="/">
          <NavbarBrand>
            <img src={Pulse} alt="Logo" />
            Pulse PT
        </NavbarBrand>
        </Link>
        
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink>
                <Link to="/Clients"> Clients</Link>
                </NavLink>
            </NavItem>
            <NavItem>
              <NavLink> 
               <Link to="/Profile"> Profile </Link>
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                 Edit Profile
                </DropdownItem>
                <DropdownItem onClick = {signOut}>
                  Sign Out
                </DropdownItem>
                <DropdownItem>
                  Switch User
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;