import React  from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Pulse from '../images/Pulse.png';
const Footer = () => {
    

    return (
        <div>
            <Navbar className="footer" variant="dark" expand="md">
                <footer>
                    <NavbarBrand className='brand'>
                    <img src={Pulse} alt="Logo"/> Pulse PT
                    </NavbarBrand>
                </footer>
                </Navbar>
      </div>  
    );
}

export default Footer; 