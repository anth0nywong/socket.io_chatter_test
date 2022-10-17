import React from 'react';
import {Link} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

function App() {



  return (
     <div className="jumbotron-fluid component">
        <div className="form-group row">
            <label htmlFor="telenum" className="col-12 col-md-2 col-form-label">Contact Tel.</label>
            <div className="col-5 col-md-3">
                <input type="text" className="form-control" id="areacode" name="areacode"
                    placeholder="Area Code"/>
            </div>
            <div className="col-7 col-md-7">
                <input type="text" className="form-control" id="telnum" name="telnum"
                    placeholder="Tel. Number"/>
            </div>
        </div>
    </div>

      );
}

export default App;

