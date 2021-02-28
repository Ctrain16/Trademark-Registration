import { Button, TextField, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Signup({ loggedIn, setLoggedIn, setEmail }) {
  const history = useHistory();

  const [name, setName] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [password, setPassword] = useState("");

  function signupUser() {
    if (!name || !tempEmail || !password) {
      alert("Missing name, email, or password");
      return;
    }

    axios
      .post("http://localhost:3001/api/signup", {
        name: name,
        email: tempEmail.toLowerCase(),
        password: password,
      })
      .then((response) => {
        if (response.data === "Duplicate Email") {
          alert("Email has already been registered.");
          return;
        } else {
          setLoggedIn(true);
          setEmail(tempEmail.toLowerCase());
          setName("");
          setTempEmail("");
          setPassword("");
          history.push("/");
        }
      });
  }

  return (
    <div className="center-container">
      <div className="form">
        <h1>Sign up</h1>
        <form>
          <div>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            <Button variant="contained" color="primary" onClick={signupUser}>
              Sign up
            </Button>
          </div>
        </form>

        <div>
          <Typography variant="subtitle2">
            Have an account?{" "}
            <Link to="/Login" style={{ color: "blue" }}>
              Login
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default Signup;
