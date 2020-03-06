import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
    return (
    <div className="App">
    <header className="App-header">    
    <div className="forum">
        <p>
            <input
                type="text"
                placeholder = "Username"
            />
        </p>
        <p>
            <input
                type="text"
                placeholder = "Password"
            />
        </p>
        <p>
            <Link className = "nav-link" to='/User'>Enter</Link>
        </p>
    </div>    
    </header>
    
</div>
);
}

export default Login;