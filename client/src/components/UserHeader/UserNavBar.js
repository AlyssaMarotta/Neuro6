import React from 'react';
import { Link } from 'react-router-dom';
import './UserNavBar.css';

const NavBar = (props) => {
    const logout = e => {
        props.updateAuthorization(false);
        props.updateAccount('');
        return;
    }

    return (
        <div className = "header">
            {/* Logo */}
            
            <Link className = "nav-title" to="/">
                <img className = "nav-logo" src={ "/NeurosurgeryLogo.gif" } alt="Neurosurgery logo" />
            </Link>

            {/* Page Links */}
            
            <div className = "nav-items">
                <Link className='nav-link' to='/ContactAndFindUs'>
                    Contact and Find Us
                </Link>
                <Link className = "nav-link" to='#'> {props.user} </Link>
                <div onClick={logout} className = "nav-link" to='/Home'>Log Out</div>
            </div>

        </div>
    )
};
export default NavBar;