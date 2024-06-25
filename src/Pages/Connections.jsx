import { useEffect, useState } from "react";
import ConnectionsComponent from "../components/ConnectionsComponent";
import "../Sass/ConnectionsPage.scss";
import { getCurrentUser } from "../api/FireStoreAPI";
function Connections() {
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  return (
    <div>
      <ConnectionsComponent currentUser={currentUser} />
    </div>
  );
}

export default Connections;

// <div>
//   <ConnectionsComponent  allUsers={allUsers}/>
// </div>
