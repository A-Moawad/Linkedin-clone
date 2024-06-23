import Home from "../Pages/Home";
import { getCurrentUser } from "../api/FireStoreAPI";
import Topbar from "../components/common/Topbar/index";
import { useMemo, useState } from "react";
function HomeLayout() {
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <>
      <Topbar currentUser={currentUser}/>
      <Home  currentUser={currentUser}/>
    </>
  );
}

export default HomeLayout;
