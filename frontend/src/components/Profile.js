import React from 'react'; 
import { Jumbotron } from 'reactstrap';


const Profile = (props) => 
{
    return (
        <div className = "jumbo"> 
            <Jumbotron> 
                <p> Trainer</p>
                <h1> Trainer name </h1>
                <h2> Trainer location, socials</h2>
                <hr/>
                <h2> Weight Loss, Diets, Workout Plans </h2>
                <h3> Bio </h3>
                <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum."
                 </p>
            </Jumbotron>
       </div>
    );

    
}

export default Profile; 