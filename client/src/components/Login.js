import { Button, TextField, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login({ loggedIn, setLoggedIn, setEmail }) {
  const history = useHistory();
  const [tempEmail, setTempEmail] = useState("");
  const [password, setPassword] = useState("");

  function loginUser() {
    if (!tempEmail || !password) {
      alert("Missing email or password");
      return;
    }

    if (loggedIn) {
      alert("You are already logged into an account");
    } else {
      axios
        .post("http://localhost:3001/api/login", {
          email: tempEmail.toLowerCase(),
        })
        .then((response) => {
          if (response.data !== "") {
            if (response.data.password === password) {
              //email is registered and correct password was supplied
              setEmail(tempEmail.toLowerCase());
              setLoggedIn(true);
              setPassword("");
              setTempEmail("");
              history.push("/");
            } else {
              //email is registered but wrong password
              alert("Incorrect password");
              setPassword("");
            }
          } else {
            alert("Email has not been registered");
          }
        });
    }
  }

  return (
    <div className="center-container">
      <div className="form">
        <h1>Login</h1>
        <form>
          <div>
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              placeholder="example@email.com"
              value={tempEmail}
              onChange={(e) => setTempEmail(e.target.value)}
            />
          </div>
          <div>
            <TextField
              name="password"
              label="Password"
              variant="outlined"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Button variant="contained" color="primary" onClick={loginUser}>
              Login
            </Button>
          </div>
        </form>

        <div>
          <Typography variant="subtitle2">
            Don't have an account?{" "}
            <Link to="/Signup" style={{ color: "blue" }}>
              Sign Up
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default Login;
