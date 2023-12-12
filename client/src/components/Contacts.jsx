import React from "react";
import { useContactsContext } from "../contexts/ContactsContext";
import { ListGroup, ListGroupItem } from "react-bootstrap";

const Contacts = () => {
  const { contacts } = useContactsContext();

  return (
    <ListGroup variant="flush">
      {contacts.map((contact) => (
        <ListGroupItem key={contact.id}>{contact.name}</ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default Contacts;
