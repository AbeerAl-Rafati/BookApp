import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
import './Header.css';


class Header extends React.Component {

  render() {
    // const { isAuthenticated } = this.props.auth0;
    return (
      <Navbar style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'left' }} collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <>
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          {/* TODO: if the user is logged in, render the `LogoutButton` - if the user is logged out, render the `LoginButton` */}
          {this.props.auth0.isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </>
      </Navbar>
    );
  }
}

export default withAuth0(Header);
