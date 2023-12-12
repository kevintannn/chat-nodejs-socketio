import { ListGroup } from "react-bootstrap";
import { useConversationsContext } from "../contexts/ConversationsContext";

const Conversations = () => {
  const { conversations, selectConversationIndex } = useConversationsContext();

  return (
    <ListGroup variant="flush">
      {conversations.map((conversation, idx) => (
        <ListGroup.Item
          key={idx}
          action
          active={conversation.selected}
          onClick={() => selectConversationIndex(idx)}
        >
          {conversation.recipients.map((r) => r.name).join(", ")}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Conversations;
