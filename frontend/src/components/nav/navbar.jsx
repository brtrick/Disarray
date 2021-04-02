import React from 'react';
import {Link, withRouter } from 'react-router-dom'
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
        const { location } = this.props
        if (this.props.loggedIn) {
            return (
                <div 
                className='session-link'
                onClick={this.logoutUser}>Logout</div>
            );
        } else {
            if (location.pathname === '/login') {
                return (
                    <Link className='session-link' to={'/signup'}>Signup</Link>
                );
            } else if (location.pathname === '/signup') {
                return (
                    <Link className='session-link' to={'/login'}>Login</Link>
                );
            } else {
                return (
                    <>
                        <Link className='session-link' to={'/login'}>Login</Link>
                        <Link className='session-link' to={'/signup'}>Signup</Link>
                    </>
                );
            }
        }
    }

    render() {
        return (
            <div className='nav-wrapper'>
                <Link to='/board' className='new-game'>New Game</Link>
                <Link to='/'className='game-header'>
                    <span className='d'>D</span>
                    <div className='end-wrap'>
                        <div className='stacked'>
                            <span className='is'>is</span>
                            <span className='array'>arr</span>
                        </div>
                        <div className='last-two'>
                            <span className='a'>a</span>
                            <span className='y'>y</span>
                        </div>
                    </div>
                </Link>                
                <div className='session-links-wrap'>{this.getLinks()}</div>
            </div>
        );
    }
}

export default withRouter(NavBar);