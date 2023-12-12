import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useContactsContext } from "../contexts/ContactsContext";
import { useConversationsContext } from "../contexts/ConversationsContext";

const NewConversationModal = ({ closeModal }) => {
  const { contacts } = useContactsContext();
  const { createConversation } = useConversationsContext();
  const [selectedContactIds, setSelectedContactIds] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    createConversation(selectedContactIds);
    closeModal();
  };

  const handleCheckboxChange = (contactId) => {
    setSelectedContactIds((prev) => {
      if (prev.includes(contactId)) {
        return prev.filter((item) => item.id !== contactId);
      } else {
        return [...prev, contactId];
      }
    });
  };

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={selectedContactIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              ></Form.Check>
            </Form.Group>
          ))}

          <br />

          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewConversationModal;
