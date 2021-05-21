import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddBookForm from './components/form'
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import UpdateForm from './components/updateForm';


class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      userData: this.props.auth0.user,
      BookDescription: '',
      BookName: '',
      Bookstatus: '',
      PopUpForm: false,
      idx: 0
      // selectedBook: []
    }
  }
  handeleChanges = e => this.setState({ [e.target.name]: e.target.value })

  handeleSubmit = async (e) => {

    e.preventDefault();

    const bodyData = {
      userEmail: this.state.userData.email,
      BookName: this.state.BookName,
      Bookstatus: this.state.Bookstatus,
      BookDescription: this.state.BookDescription
    }

    const newBook = await axios.post(`${process.env.REACT_APP_SERVER}/books`, bodyData);


    this.setState({
      books: newBook.data.books
    })


    // console.log(newBook.data.books)


  }

  componentDidMount = async () => {
    const { user } = this.props.auth0;

    try {


      const books = await axios.get(`${process.env.REACT_APP_SERVER}/books?Email=${user.email}`);


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

    await axios.delete(`http://localhost:3001/books/${index}?email=${user.email}`)
  }


  popUpUpdateForm = (index) => {
    const newBookArr = this.state.books.filter((book, i) => {
      return index === i
    })
    this.setState({
      PopUpForm: true,
      idx: index,
      // selectedBook: newBookArr
      BookDescription: newBookArr[0].description,
      BookName: newBookArr[0].name,
      Bookstatus: newBookArr[0].status,
    })
    console.log(newBookArr)


  }

  updateBook = async (e) => {
    e.preventDefault();

    const reqBody = {
      BookDescription: this.state.BookDescription,
      BookName: this.state.BookName,
      Bookstatus: this.state.Bookstatus
    }

    const editedBook = await axios.put(`http://localhost:3001/books/${this.state.idx}`, reqBody);

    this.setState({
      books: editedBook.data[0].books
    })

  }

  stopPopUp = () => {
    this.setState({ PopUpForm: false });
  }
  // PopUp = () => {
  //   this.setState({ PopUpForm: true });
  // }
  render() {


    try {

      console.log(this.state.books)

      const bookList = this.state.books.map((book, i) => {

        console.log(this.state.books)
        return (
          <Container key={i} fluid>
            <Row className='justify-content-md-center'>
              <Card border="info" style={{ width: '20rem', margin: '0.5rem' }}>
                <Card.Body>
                  <Card.Title>{book.name}</Card.Title>
                  <Card.Text>{book.description}</Card.Text>
                  <Card.Footer>{book.status}</Card.Footer>
                  <Button style={{ margin: '.2rem' }} onClick={() => this.deleteBook(i)} variant="danger">Delete</Button>
                  <Button style={{ margin: '.2rem' }} onClick={(e) => this.popUpUpdateForm(i)} variant="warning">Edit </Button>

                </Card.Body >
              </Card >
            </Row>
          </Container >
        )
      });

      // console.log(this.state.books)

      const { isAuthenticated } = this.props.auth0;

      return (<>{isAuthenticated &&
        <Jumbotron>

          <h1>My Favorite Books</h1>
          <p>
            This is a collection of my favorite books
          </p>
          <AddBookForm
            handeleChanges={this.handeleChanges}
            handeleSubmit={this.handeleSubmit}
          />
          {bookList}
          <>
            {this.state.PopUpForm &&
              <UpdateForm
                popUpUpdateForm={this.popUpUpdateForm}
                stopPopUp={this.stopPopUp}
                // selectedBook={this.state.selectedBook}
                BookDescription={this.state.BookDescription}
                BookName={this.state.BookName}
                Bookstatus={this.state.Bookstatus}
                handeleChanges={this.handeleChanges}
              />
            }
          </>
        </Jumbotron>

      }
      </>
      );

    } catch (err) {
      console.log(err)
    }


  }
}

export default withAuth0(MyFavoriteBooks);
