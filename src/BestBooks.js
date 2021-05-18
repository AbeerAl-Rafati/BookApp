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
  // renderBook = () => {
  //   const { isAuthenticated } = this.props.auth0;

  //   isAuthenticated && this.componentDidMount();
  // }

  componentDidMount = async () => {
    const { user } = this.props.auth0;

    try {

      // console.log(process.env.REACT_APP_PORT)
      const books = await axios.get(`http://localhost:3001/books?Email=${user.email}`);


      this.setState({
        books: books.data[0].books,

      });

    } catch (error) {
      console.log(error);
    }
  }

  render() {

    const bookList = this.state.books.map((book, i) =>{

      return (
        <div key={i}>
          <p>Book name: {book.name}</p>
          <p>Book status: {book.status}</p>
          <p>Book description: {book.description}</p>
        </div>
      )
    });



    const { isAuthenticated } = this.props.auth0;

    return (<>{isAuthenticated &&
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        {bookList}
      </Jumbotron>}
    </>
    );
  }
}

export default withAuth0(MyFavoriteBooks);
