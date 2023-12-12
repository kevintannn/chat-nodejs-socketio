import Login from "./Login";
import useLocalStorage from "./hooks/useLocalStorage";
import Dashboard from "./Dashboard";
import { ContactsProvider } from "./contexts/ContactsContext";
import { ConversationsProvider } from "./contexts/ConversationsContext";
import { SocketProvider } from "./contexts/SocketContext";

const App = () => {
  const [id, setId] = useLocalStorage("id");

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );

  return id ? dashboard : <Login setId={setId} />;
};

export default App;
