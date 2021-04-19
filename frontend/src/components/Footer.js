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
                            Pulse PT (Personal Trainer) is a high-intesity fitness app designed to help individuals who want a healthier lifestyle, and trainers who would like better and more advanced tracking
                             features for their clients. With this app trainers can create workout plans specailly designed for each client based on their needs, and track their progress
                            via heart rate. 
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
              <li><FontAwesomeIcon className = "iconSpace" icon={faFacebook} size = "3x" /></li>
              <li> <FontAwesomeIcon className = "iconSpace" icon={faTwitter} size = "3x"/> </li>
              <li><FontAwesomeIcon className = "iconSpace" icon={faGithub} size = "3x"/> </li>
              <li><FontAwesomeIcon className = "iconSpace" icon={faDiscord} size = "3x"/> </li>
            </ul>
          </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer; 