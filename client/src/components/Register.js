import { useState } from "react";
import axios from "axios";
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

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
    <div className="center-container">
      <div className="form">
        <h1>Register Trademark</h1>
        <form>
          <div>
            <TextField
              name="trademark"
              label="Trademark"
              variant="outlined"
              placeholder="Your Trademark"
              value={trademark}
              onChange={(e) => setTrademark(e.target.value)}
            />
          </div>
          <div>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                minWidth: 200,
              }}
            >
              {trademarkCategories.map((catType, index) => (
                <MenuItem key={index} value={catType}>
                  {catType}
                </MenuItem>
              ))}
            </Select>
          </div>

          <Button
            variant="contained"
            color="primary"
            onClick={registerTrademark}
          >
            Register
          </Button>
        </form>

        <p>(1) All Trademarks start date is set to the current day.</p>
        <p>(2) Trademarks expire five years after being created.</p>
      </div>
    </div>
  );
}

export default Register;
