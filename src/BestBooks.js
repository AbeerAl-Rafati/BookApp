import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

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
      console.log(user.email)
      // console.log(process.env.REACT_APP_PORT)
      const books = await axios.get(`http://localhost:3001/books?Email=${user.email}`);


      this.setState({
        books: books.data[0].books,

      });

    } catch (error) {
      console.log(error);
    }
  }

  deleteBook = async (index) => {
    const { user } = this.props.auth0;
    const newArrayOfBooks = this.state.books.filter((book, i) => {
      return i !== index;
    });

    this.setState({ books: newArrayOfBooks });
    console.log(newArrayOfBooks);
    console.log(user.email.indexOf(index));

    await axios.delete(`http://localhost:3001/books/${index}?Email=${user.email}`)
  }



  render() {

    const bookList = this.state.books.map((book, i) => {
      return (
        <Container key={i} fluid>
          <Row className='justify-content-md-center'>
            <Card border="info" style={{ width: '20rem', margin: '0.5rem' }}>
              <Card.Body>
                <Card.Title>{book.name}</Card.Title>
                <Card.Text>{book.description}</Card.Text>
                <Card.Footer>{book.status}</Card.Footer>
                <Button onClick={(e) => this.deleteBook(i)} variant="danger">Delete the Book</Button>
              </Card.Body >
            </Card >
          </Row>
        </Container >
      )
    });

    console.log(this.state.books)

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
