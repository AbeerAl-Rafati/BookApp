import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';


class MyFavoriteBooks extends React.Component {

  render() {
    const { isAuthenticated } = this.props.auth0;
    return (<>{isAuthenticated &&
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
      </Jumbotron>}</>
    );
  }
}

export default withAuth0(MyFavoriteBooks);
