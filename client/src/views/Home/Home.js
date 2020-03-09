import React from 'react';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div className="App">
            <header className="App-header">
                <div className = "section"> 
                <p>
                    
                <Link to='/Login'>
                    <button className="buttons">Login</button>
                </Link>
                </p>
                <p>
                    <button className="buttons">Sign Up</button>
                </p>
                </div> 
            </header>
        </div>
    );
}

export default Home;
