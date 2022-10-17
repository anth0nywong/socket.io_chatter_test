import React from 'react';
import Link from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

function App() {



  return (
     <div className="jumbotron-fluid component">
            <div className="container">
                <h1 className="display-3">Contact Me</h1>
                <hr className="my-2"/>
            </div>
            <div className="container">
                <div className="row">
                    
                    <div className="col-12 col-sm-6">
                        <h3>Contact Information</h3>
                        <h5>Direct Contact</h5>
                        Name: Hok Hei Wong<br/>
                        <i className="fa fa-phone fa-lg"></i>: 647 333 7558<br/>
                            <i className="fa fa-envelope fa-lg"></i>
                            <a href="mailto:confusion@food.net">whokhei@my.centennialcollege.ca</a>
                    </div>
                    <div className="col-12 col-sm-6">
                        <h3>Location</h3>
                        <h5>My Address</h5>
                        <address>
                            105, John Tabor Trail<br/>
                            Scarborough<br/>
                            Ontario<br/>
                            M1B 2P6<br/>
                         </address>
                    </div>
                </div>
                <hr className="my-2"/>
            </div>
    </div>

      );
}

export default App;

