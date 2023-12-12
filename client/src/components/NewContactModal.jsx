import React, { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useContactsContext } from "../contexts/ContactsContext";

const NewContactModal = ({ closeModal }) => {
  const idRef = useRef(null);
  const nameRef = useRef(null);

  const { createContact } = useContactsContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    createContact(idRef.current.value, nameRef.current.value);
    closeModal();
  };

  return (
    <>
      <Modal.Header closeButton>Create Contact</Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="id">ID</Form.Label>
            <Form.Control id="id" type="text" ref={idRef} />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="name">Name</Form.Label>
            <Form.Control id="name" type="text" ref={nameRef} />
          </Form.Group>

          <br />

          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewContactModal;
