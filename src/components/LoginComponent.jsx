import { LoginAPI, GoogleSignInAPI } from "../api/AuthAPI";
import "../Sass/LoginComponent.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LinkedinLogo from "../assets/linkedinLogo.png";
import GoogleButton from "react-google-button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify

function LoginComponent() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const handleLogin = async () => {
    try {
      let res = await LoginAPI(credentials.email, credentials.password);
      localStorage.setItem("userEmail",res.user.email);
      toast.success("Logged in successfully!");
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await GoogleSignInAPI();
      console.log("User signed in:", res.user);
      toast.success("Signed in with Google successfully!");
      // navigate("/");
    } catch (err) {
      console.error("Error signing in:", err);
      toast.error("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="login-wrapper">
      <img src={LinkedinLogo} className="linkedinLogo" alt="LinkedIn Logo" />
      <div className="login-wrapper-inner">
        <h1 className="heading">Sign in</h1>
        <p className="sub-heading">Stay updated on your professional world</p>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email or Phone"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password"
          />
        </div>
        <button onClick={handleLogin} className="login-btn">
          Sign in
        </button>
      </div>
      <hr className="hr-text" data-content="or" />
      <div className="google-btn-container">
        <p style={{ textAlign: "center", fontSize: "14px" }}>
          By clicking Continue, you agree to LinkedIn’s User Agreement,
          <br />
          Privacy Policy, and Cookie Policy.
        </p>
        <GoogleButton
          style={{ marginTop: "20px" }}
          onClick={handleGoogleLogin}
        />
        <p className="go-to-signup">
          New to LinkedIn?{" "}
          <span className="join-now" onClick={() => navigate("/register")}>
            Join now
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginComponent;
