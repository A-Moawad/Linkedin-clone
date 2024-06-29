import { useState, useEffect } from "react";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { getConnections } from "../../../api/FireStoreAPI";
import "./index.scss";
import { useNavigate } from "react-router-dom";
function ConnectionCards({ user, currentUser, handleConnectionBtn }) {
  const [isConnected, setIsConnected] = useState(false);

    const navigate = useNavigate();


  console.log(user);
  useEffect(() => {
    getConnections(currentUser.id, user.id, setIsConnected);
  }, [currentUser.id, user.id]);

  return (
    <div className="connections-body">
      <div className="connections-card" key={user.id}>
        <img src={user.imageLink} alt="user" />
        <h3
          onClick={() =>
            navigate("/profile", {
              state: { id: user.id, email: user.email},
            })
          }
        >
          {user.name}
        </h3>
        <p className="headline">{user.headline}</p>
        <button onClick={() => handleConnectionBtn(user)}>
          <AiOutlineUserSwitch className="icon connections" />
          <p>connect</p>
        </button>
      </div>
    </div>
  );
}

export default ConnectionCards;
