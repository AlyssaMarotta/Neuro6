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
                <Link to='/CreateUser'>
                    <button className="buttons">Create Account</button>
                </Link>
                </p>
                </div> 
            </header>
        </div>
    );
}

export default Home;
