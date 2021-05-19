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

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      userData:this.props.auth0.user,
      BookDescription:'',
      BookName :'',
      Bookstatus:''
    }
  }
  handeleChanges = e => this.setState({[e.target.name]:e.target.value})

  handeleSubmit = async (e) =>{

    e.preventDefault();

    const bodyData ={
      userEmail:this.state.userData.email,
      BookName:this.state.BookName,
      Bookstatus:this.state.Bookstatus,
      BookDescription:this.state.BookDescription
    }
    
    const newBook = await axios.post(`${process.env.REACT_APP_SERVER}/books`, bodyData);


    this.setState({
      books:newBook.data.books
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



  render() {


    try{

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
                  <Button onClick={(e) => this.deleteBook(i)} variant="danger">Delete the Book</Button>
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
          <AddBookForm 
            handeleChanges={this.handeleChanges}
            handeleSubmit={this.handeleSubmit}
             />
          <h1>My Favorite Books</h1>
          <p>
            This is a collection of my favorite books
          </p>
          {bookList}
        </Jumbotron>}
      </>
      );

    }catch (err){
      console.log(err)
    }


  }
}

export default withAuth0(MyFavoriteBooks);
