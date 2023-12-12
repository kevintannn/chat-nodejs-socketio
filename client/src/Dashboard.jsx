/* eslint-disable react/prop-types */
import OpenConversation from "./components/OpenConversation";
import Sidebar from "./components/Sidebar";
import { useConversationsContext } from "./contexts/ConversationsContext";

const Dashboard = ({ id }) => {
  const { selectedConversation } = useConversationsContext();

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Sidebar id={id} />
      {selectedConversation && <OpenConversation />}
    </div>
  );
};

export default Dashboard;
