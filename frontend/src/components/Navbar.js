import React, {useState} from 'react'; 
import firebase from 'firebase'
//import axios from 'axios'
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';

const NavBar = (props) => 
{
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(!dropdownOpen); 

    return (
        <div>
            <Nav tabs>
                <NavItem> 
                    <NavLink href="#" active> ghjfjhfjhfj </NavLink>
                </NavItem> 
                <NavItem> 
                    <NavLink href="#" active> hgjgjgjgkj</NavLink>
                </NavItem> 
                <NavItem> 
                    <NavLink href="#" active> gfjjgfgjf </NavLink>
                </NavItem> 
                <NavItem> 
                    <NavLink href="#" active> gfjjgfgjf </NavLink>
                </NavItem> 
                <NavItem> 
                    <NavLink href="#" active> gfjjgfgjf </NavLink>
                </NavItem> 
                <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle nav caret>
                        Dropdown
                    </DropdownToggle>
                    <DropdownMenu><DropdownItem header>Header</DropdownItem>
                    <DropdownItem disabled>Action</DropdownItem>
                    <DropdownItem>Another Action</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Another Action</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </Nav>
        </div>

    ); 
}

export default NavBar; 