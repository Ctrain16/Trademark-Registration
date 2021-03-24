import {
  Button,
  makeStyles,
  TextField,
  Typography,
  Avatar,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Container,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.dark,
  },
}));

function Signup({ loggedIn, setLoggedIn, setEmail }) {
  const classes = useStyles();
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
    <Container component="main" maxWidth="xs">
      <div className="paper">
        <Avatar className={classes.avatar}>
          <AccountCircle />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className="form">
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="name"
            label="Name"
            id="name"
            autoComplete="name"
            placeholder="Firstname Lastname"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="email"
            label="Email"
            id="email"
            autoComplete="email"
            placeholder="example@email.com"
            value={tempEmail}
            onChange={(e) => setTempEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/**
           * Implement remember me functionality
           * 
           * <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />*/}
          <div className="submit-button">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={signupUser}
            >
              Sign up
            </Button>
          </div>
          <Grid container direction="row" justify="center">
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                history.push("./Login");
              }}
            >
              Already have an account? Login
            </Link>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Signup;
