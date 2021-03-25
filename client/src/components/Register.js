import { useState } from "react";
import axios from "axios";
import { Button, Container, TextField, Typography } from "@material-ui/core";

function Register({ loggedIn, email, setResultsList, trademarkCategories }) {
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
        .post("/api/login", {
          email: email.toLowerCase(),
        })
        .then((response) => {
          const name = response.data.name;

          axios
            .post("/api/register", {
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
      <div className="paper">
        <Typography component="h1" variant="h5">
          Register Trademark
        </Typography>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
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

          <div className="submit-button">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={registerTrademark}
            >
              Register
            </Button>
          </div>
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
