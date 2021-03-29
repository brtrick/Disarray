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
                <div>
                    <Link to={'/'}>Logged In NavBar</Link>
                    <button onClick={this.logoutUser}>Logout</button>
                </div>
            );
        } else {
            return (
                <div>
                    <Link to={'/'}>Logged Out NavBar</Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div className='nav-wrapper'>
                <h1>Disarray Logo</h1>
                { this.getLinks()}
            </div>
        );
    }
}

export default NavBar;