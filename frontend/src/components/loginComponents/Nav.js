import React from 'react';
import { Navbar, NavbarBrand, } from 'reactstrap';
import Pulse from '../../images/Pulse.png';

const NavBar = (props) => {

    return (
        <div>
            <Navbar className="color.nav" variant="dark" expand="md">
                <NavbarBrand className='brand'>
            <img src={Pulse} alt="Logo"/>
            Pulse PT
        </NavbarBrand>
            </Navbar>

        </div>
        
    );
}
export default NavBar;