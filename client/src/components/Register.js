import { useState } from "react";
import axios from "axios";
import {
  Button,
  Container,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Register({ loggedIn, email, setResultsList, trademarkCategories }) {
  const classes = useStyles();

  const [trademark, setTrademark] = useState("");
  const [category, setCategory] = useState("");

  function registerTrademark() {
    setResultsList([]);

    if (!trademark || !category) {
      alert("Please fill out the entire form");
      return;
    }

    if (loggedIn) {
      axios
        .post("http://localhost:3001/api/login", {
          email: email.toLowerCase(),
        })
        .then((response) => {
          const name = response.data.name;

          axios
            .post("http://localhost:3001/api/register", {
              trademark: trademark,
              owner: name,
              email: email,
              category: category,
            })
            .then((response) => {
              console.log(response);
              if (response.data !== "Trademark Exists") {
                alert("Trademark successfully registered.");
                setTrademark("");
                setCategory("");
              } else {
                alert(
                  "Same trademark already exists in the selected category."
                );
              }
            });
        });
    } else {
      alert("You must be logged in to register a trademark.");
      setTrademark("");
      setCategory("");
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Register Trademark
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="trademark"
            label="Trademark"
            id="trademark"
            autoComplete="trademark"
            placeholder="Your Trademark"
            value={trademark}
            onChange={(e) => setTrademark(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            select
            required
            fullWidth
            name="category"
            label="Category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {trademarkCategories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={registerTrademark}
            className={classes.submit}
          >
            Register
          </Button>
        </form>

        <Typography variant="caption">
          (1) All Trademarks start date is set to the current day.
        </Typography>
        <Typography variant="caption">
          (2) Trademarks expire five years after being created.
        </Typography>
      </div>
    </Container>
  );
}

export default Register;
