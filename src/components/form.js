
import { withAuth0 } from '@auth0/auth0-react';
import { Form, Row, Col } from 'react-bootstrap';
// import axios from 'axios';

import React, { Component } from 'react'

class AddBookForm extends Component {
  render() {

    return (
      <>
        <Form onSubmit={(e) => this.props.handeleSubmit(e)} >
          <Row>
            <Col>
              <Form.Control onChange={(e) => this.props.handeleChanges(e)} name="BookName" placeholder="book name" />
            </Col>
            <Col>
              <Form.Control onChange={(e) => this.props.handeleChanges(e)} name="Bookstatus" as="select" custom>
                <option>choose state</option>
                <option>published</option>
                <option>not published</option>
              </Form.Control>
            </Col>
            <Col>
              <Form.Control onChange={(e) => this.props.handeleChanges(e)} name="BookDescription" placeholder="Book description" />
            </Col>
            <Col>
              <input className="btn btn-outline-primary" type="submit" value="add new book" />
            </Col>
          </Row>
        </Form>
      </>
    )
  }
}




export default withAuth0(AddBookForm);