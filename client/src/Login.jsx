import React, { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const Login = ({ setId }) => {
  const idRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    setId(idRef.current.value);
  };

  const createNewId = () => {
    setId(`user@${uuidv4().split("-")[0]}`);
  };

  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: "100vh" }}
    >
      <Form className="w-100" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="id">Enter your ID</Form.Label>
          <Form.Control id="id" type="text" ref={idRef} required />
        </Form.Group>

        <br />

        <Button type="submit" className="me-2">
          Login
        </Button>
        <Button variant="secondary" onClick={createNewId}>
          Create a new ID
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
