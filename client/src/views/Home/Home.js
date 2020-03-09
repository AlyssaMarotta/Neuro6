import React from 'react';
import ReactDOM from 'react-dom';
import {Redirect, withRouter} from 'react-router-dom';

import logo from '../../assets/logo.svg';
import uflogo from '../../assets/NeurosurgeryLogo.gif';
import uflogo2 from '../../assets/uf-monogram.svg';
import './Home.css';



function Home() {

 
    return (
        <div className="App">
            <header className="App-header">
            <img src={uflogo} className="App-logo" alt="logo" 
                />
                {/* <img src={uflogo2} className="App-logo" alt="logo" 
                />
                <p>
                    Lilian S. Wells Department <i>of</i> Neurosurgery <td>{"\n"}</td>
                    <i>at the</i> University of Florida
                </p> */}

                <p></p>
                <button to = '/Login' className="buttons">Login</button>
                <p></p>
                <button className="buttons">Sign Up</button>
                
            </header>
        </div>
    );
}

export default Home;
