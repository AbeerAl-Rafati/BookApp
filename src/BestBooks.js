import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],

    }
  }


  getUserBooks = async () => {
    const { user } = this.props.auth0;

    try {
      const books = await axios.get(`${process.env.REACT_APP_SERVER}/books?email=${user.email}`);



      this.setState({
        books: books.data[0].books,
      });

    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth0;
    return (<>{isAuthenticated &&
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        {this.state.books.map((book, i) =>
          <div key={i}>
            <p>Book name: {book.name}</p>
            <p>Book status: {book.status}</p>
            <p>Book description: {book.description}</p>
          </div>)}
      </Jumbotron>}</>
    );
  }
}

export default withAuth0(MyFavoriteBooks);
