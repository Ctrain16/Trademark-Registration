import {
  Avatar,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Link,
  makeStyles,
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

function Login({ loggedIn, setLoggedIn, setEmail }) {
  const classes = useStyles();
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
        .post("/api/login", {
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
    <Container component="main" maxWidth="xs">
      <div className="paper">
        <Avatar className={classes.avatar}>
          <AccountCircle />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="form"
        >
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
          <div className="submit-button">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={loginUser}
            >
              Login
            </Button>
          </div>

          <Grid container direction="row" justify="center">
            <Link
              component="button"
              type="button"
              variant="body2"
              onClick={() => {
                history.push("./Signup");
              }}
            >
              Don't have an account? Sign up
            </Link>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Login;
