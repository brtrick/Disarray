import React from 'react';
import { Link } from 'react-router-dom'
import '../../stylesheets/navbar.css'

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    // Selectively render links dependent on whether the user is logged in
    getLinks() {
        if (this.props.loggedIn) {
            return (
                <div className='session-links'>
                    <button onClick={this.logoutUser}>Logout</button>
                </div>
            );
        } else {
            return (
                <div className='session-links'>
                    <Link to={'/login'}>Login</Link>
                    <Link to={'/signup'}>Signup</Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div className='nav-wrapper'>
                <div className='left-nav'></div>
                <h1 className='game-header'>Disarray</h1>
                <div className='session-links-wrapper'>{this.getLinks()}</div>
            </div>
        );
    }
}

export default NavBar;