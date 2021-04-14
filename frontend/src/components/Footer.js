import React from 'react';
import { faFacebook, faTwitter, faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Footer = () => {
    
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <h6> About</h6>
                        <p className="text-justify">
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                             dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        </p>
                    </div>
                    <div className="col-xs-6 col-md-3">
                        <h6> Categories </h6>
                        <ul className="footer-links">
                        <li> Clients</li>
                        <li> Routines</li>
                            <li> Workouts</li>
                            <li> Download the Mobile App </li>
                          
                        </ul>
                    </div>
                    <div className="col-xs-6 col-md-3">
                        <h6> Quick Links </h6>
                        <ul className="footer-links">
                        <li> About Us </li>
                            <li> Contact Us</li>
                            <li> Privacy</li>
                            <li> Settings</li>
                        </ul>
                    </div>
                   
                </div>
                <div className="container">
                    <div className="row">
                        <hr className="hr" />
                        <div className="col-md-8 col-sm-6 col-xs-12">
                            
                            <p className = "copyright-text"> Copyright &copy; 2021 All Rights Reserved by Pulse PT. </p>
                        </div>
                        <div class="col-md-4 col-sm-6 col-xs-12">
            <ul class="social-icons">
              <li><FontAwesomeIcon icon={faFacebook} size = "3x" /></li>
              <li> <FontAwesomeIcon icon={faTwitter} size = "3x"/> </li>
              <li><FontAwesomeIcon icon={faGithub} size = "3x"/> </li>
              <li><FontAwesomeIcon icon={faDiscord} size = "3x"/> </li>
            </ul>
          </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer; 