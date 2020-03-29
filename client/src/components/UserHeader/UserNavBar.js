import React from 'react';
import { Link } from 'react-router-dom';
import './UserNavBar.css';
import Cookies from 'universal-cookie';

const NavBar = (props) => {
    const cookies = new Cookies();
    const logout = e => {
        cookies.remove('account')
        return;
    }

    return (
        <div className = "header">
            {/* Logo */}
            
            <Link className = "nav-title" to="/">
                <img className = "nav-logo" src={ "/UFHealthLogo.png" } alt="Neurosurgery logo" />
            </Link>

            {/* Page Links */}
            
            <div className = "nav-items">
                <Link className='nav-link' to='/ContactAndFindUs'>
                    Contact and Find Us
                </Link>
                <Link className = "nav-link" to='#'> {cookies.get('account')} </Link>
                <div onClick={logout} className = "nav-link" to='/Home'>Log Out</div>
            </div>

        </div>
    )
};
export default NavBar;