import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import './Login.css';







function LoginButton() {
  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  return (
    !isAuthenticated && (
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Log In</Card.Title>
          <Card.Text>
            Click Below to Log In
            </Card.Text>
          {/* TODO: add a `LoginButton` component here that will log the user in with Auth0 */}
          <button onClick={loginWithRedirect}>Log in</button>
        </Card.Body>
      </Card>
    )
  );
}



export default LoginButton;
