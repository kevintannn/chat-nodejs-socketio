/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContactsContext } from "./ContactsContext";
import { useSocketContext } from "./SocketContext";

const ConversationsContext = createContext(null);

export function useConversationsContext() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ id, children }) {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    [],
  );
  const [selectedConversationIdx, setSelectedConversationIdx] = useState(0);

  const { contacts } = useContactsContext();
  const socket = useSocketContext();

  const createConversation = (recipients) => {
    setConversations((prev) => {
      return [...prev, { recipients, messages: [] }];
    });
  };

  const formattedConversations = conversations.map((conv, idx) => {
    const recipients = conv.recipients.map((rec) => {
      const contact = contacts.find((contact) => {
        return contact.id === rec;
      });
      const name = (contact && contact.name) || rec;
      return { id: rec, name };
    });

    const messages = conv.messages.map((msg) => {
      const contact = contacts.find((contact) => {
        return contact.id === msg.sender;
      });
      const name = (contact && contact.name) || msg.sender;
      const fromMe = id === msg.sender;
      return { ...msg, senderName: name, fromMe };
    });

    const selected = idx === selectedConversationIdx;

    return { ...conv, messages, recipients, selected };
  });

  const addMessageToConversation = useCallback(
    ({ recipients, text, sender }) => {
      setConversations((prev) => {
        let madeChange = false;
        const newMessage = { sender, text };
        const newConversations = prev.map((conv) => {
          if (arrayEquality(conv.recipients, recipients)) {
            madeChange = true;
            return { ...conv, messages: [...conv.messages, newMessage] };
          }

          return conv;
        });

        if (madeChange) {
          return newConversations;
        } else {
          return [...prev, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations],
  );

  const sendMessage = (recipients, text) => {
    socket.emit("send-message", { recipients, text });

    addMessageToConversation({ recipients, text, sender: id });
  };

  const value = {
    conversations: formattedConversations,
    createConversation,
    selectConversationIndex: setSelectedConversationIdx,
    selectedConversation: formattedConversations[selectedConversationIdx],
    sendMessage,
  };

  useEffect(() => {
    if (socket == null) return;

    socket.on("receive-message", addMessageToConversation);

    return () => socket.off("receive-message");
  }, [socket, addMessageToConversation]);

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}

const arrayEquality = (a, b) => {
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  return a.every((element, idx) => {
    return element === b[idx];
  });
};
