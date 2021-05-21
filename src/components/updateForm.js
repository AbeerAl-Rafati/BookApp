import React, { Component } from 'react'
import { Form, Modal, Button } from 'react-bootstrap';

export class UpdateForm extends Component {
  render() {
    return (
      <Modal show={this.props.popUpUpdateForm} onHide={this.props.stopPopUp} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Edit the Book Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => this.props.popUpUpdateForm(e)} >

            <Form.Control onChange={(e) => this.props.handeleChanges(e)} style={{ margin: '.2rem' }} value={this.props.BookName} name="BookName" placeholder="book name" />

            <Form.Control onChange={(e) => this.props.handeleChanges(e)} style={{ margin: '.2rem' }} value={this.props.Bookstatus} name="Bookstatus" as="select" custom>
              <option>choose state</option>
              <option>published</option>
              <option>not published</option>
            </Form.Control>

            <Form.Control onChange={(e) => this.props.handeleChanges(e)} style={{ margin: '.2rem' }} value={this.props.BookDescription} name="BookDescription" placeholder="Book description" />

            <input className="btn btn-outline-primary" type="submit" style={{ margin: '.2rem' }} value="add new book" />

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.props.stopPopUp}>
            Close
            </Button>

        </Modal.Footer>
      </Modal>
    )
  }
}

export default UpdateForm;
