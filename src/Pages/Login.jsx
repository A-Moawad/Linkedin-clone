import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import LoginComponent from "../components/LoginComponent";
import Loader from "../components/common/Loader";

function Login() {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.accessToken) {
        navigate("/home");
        console.log(user.accessToken);
      } else {
        setLoading(false);
        console.log("no user");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  return loading ? <Loader /> : <LoginComponent />;
}

export default Login;
