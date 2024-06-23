import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import HomeComponent from "../components/HomeComponent";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";

function Home({ currentUser }) {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user?.accessToken) {
        navigate("/");
      } else {
        setLoading(false);
      }
    });
  }, []);
  return loading ? <Loader /> : <HomeComponent currentUser={currentUser} />;
}

export default Home;
