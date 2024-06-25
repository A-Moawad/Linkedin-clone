import { useEffect, useState } from "react";
import "../Sass/ConnectionsComponents.scss";
import { addConnection, getAllUsers } from "../api/FireStoreAPI";
import ConnectionCards from "../components/common/ConnectionCards/index";
const ConnectionsComponent = ({ currentUser }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    getAllUsers(setAllUsers);
  }, []);

  const handleConnectionBtn = async (user) => {
    await addConnection(currentUser.id, user.id);
  };
  return (
    <div className="connections-main">
      <div className="connections-header">
        <h1>Connections</h1>
      </div>
      <div className="connections-body">
        {allUsers.map((user) =>
          currentUser.id === user.id ? (
            <></>
          ) : (
            <ConnectionCards
              user={user}
              key={user.id}
              currentUser={currentUser}
              handleConnectionBtn={handleConnectionBtn}
            />
          )
        )}
      </div>
    </div>
  );
};

export default ConnectionsComponent;
