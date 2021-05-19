import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddBookForm from './components/form'
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';

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
    
    const newBook = await axios.post(`${process.env.REACT_APP_SERVER}/newBook`, bodyData);

    this.setState({
      books:newBook.data
    })


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
  }
}

export default withAuth0(MyFavoriteBooks);
