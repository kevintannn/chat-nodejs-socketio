/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useConversationsContext } from "../contexts/ConversationsContext";

const OpenConversation = () => {
  const { sendMessage, selectedConversation } = useConversationsContext();

  const [text, setText] = useState("");

  const setRef = useCallback((node) => {
    node?.scrollIntoView({ smooth: true });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    sendMessage(
      selectedConversation.recipients.map((rec) => rec.id),
      text,
    );
    setText("");
  };

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {selectedConversation.messages.map((msg, idx) => {
            const lastMessage =
              selectedConversation.messages.length - 1 === idx;

            return (
              <div
                ref={lastMessage ? setRef : null}
                key={idx}
                className={`my-1 d-flex flex-column ${
                  msg.fromMe
                    ? "align-self-end align-items-end"
                    : "align-items-start"
                }`}
              >
                <div
                  className={`rounded px-2 py-1 ${
                    msg.fromMe ? "bg-primary text-white" : "border"
                  }`}
                >
                  {msg.text}
                </div>
                <div
                  className={`text-muted small ${msg.fromMe ? "text-end" : ""}`}
                >
                  {msg.fromMe ? "You" : msg.senderName}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{
                height: "75px",
                resize: "none",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  handleSubmit(e);
                }
              }}
            />

            <Button type="submit">Send</Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
};

export default OpenConversation;
