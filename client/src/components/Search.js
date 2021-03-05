import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Container,
  InputAdornment,
  TextField,
  Grid,
  makeStyles,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  searchButton: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.light,
    width: 100,
  },
}));

function Search({
  search,
  setSearch,
  setResultsList,
  searchType,
  trademarkCategories,
  ownerName,
  setOwnerName,
  ownerEmail,
  setOwnerEmail,
  category,
  setCategory,
  date,
  setDate,
}) {
  const history = useHistory();
  const classes = useStyles();

  function searchDatabase() {
    axios
      .post("http://localhost:3001/api/search", {
        query: search,
        name: ownerName,
        email: ownerEmail,
        date: date,
        category: category,
      })
      .then((response) => {
        console.log(response);
        setResultsList(response.data);
        history.push("/Trademarks");
      });
  }

  if (searchType === "home") {
    return (
      <Container component="main" maxWidth="xs">
        <div className={searchType === "home" ? "paper" : "results-search"}>
          <h1>CTRC</h1>
          {searchType === "home" && (
            <h3> Cal's Trademark Registration Center</h3>
          )}

          <form onSubmit={(e) => e.preventDefault()}>
            <TextField
              type="text"
              name="search"
              fullWidth
              placeholder="Search CTRC database"
              variant="outlined"
              label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Grid container direction="row" justify="center">
              <Button
                className={classes.searchButton}
                variant="contained"
                onClick={searchDatabase}
              >
                Search
              </Button>
            </Grid>
          </form>
        </div>
      </Container>
    );
  } else {
    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <TextField
          variant="outlined"
          margin="normal"
          select
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
        <TextField
          variant="outlined"
          margin="normal"
          name="ownerName"
          label="Owner"
          id="owner"
          placeholder="Owner Name"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          name="ownerEmail"
          label="Email"
          id="email"
          placeholder="Owner Email"
          value={ownerEmail}
          onChange={(e) => setOwnerEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          id="date"
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <input
          type="submit"
          hidden
          style={{
            position: "absolute left: -9999px",
            width: "1px",
            height: "1px",
          }}
        />
      </form>
    );
  }
}

export default Search;
