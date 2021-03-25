import { useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import {
  Button,
  Container,
  InputAdornment,
  TextField,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  searchButton: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.primary.dark,
    color: "white",
    width: 100,
  },
  searchButton2: {
    backgroundColor: theme.palette.primary.dark,
    color: "white",
    width: 500,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
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

  useEffect(() => {
    if (searchType === "home") {
      setSearch("");
      setResultsList([]);
      setOwnerName("");
      setOwnerEmail("");
      setCategory("");
      setDate("");
    }
  }, [
    searchType,
    setCategory,
    setDate,
    setOwnerEmail,
    setOwnerName,
    setResultsList,
    setSearch,
  ]);

  function searchDatabase() {
    axios
      .post("/api/search", {
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
        <div className="paper">
          <Typography variant="h4">CTRC</Typography>
          <Typography
            variant="subtitle1"
            style={{
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            Cal's Trademark Registration Center
          </Typography>

          <form onSubmit={(e) => e.preventDefault()} className="form">
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
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            searchDatabase();
          }}
          className="trademark-search"
        >
          <div className="searchbar">
            <TextField
              type="text"
              name="search"
              margin="normal"
              size="small"
              placeholder="Search CTRC database"
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
          </div>

          <div>
            <TextField
              margin="normal"
              select
              label="Category"
              size="small"
              name="category"
              SelectProps={{
                native: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="" disabled>
                Select Trademark Category
              </option>
              {trademarkCategories.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </TextField>
          </div>

          <div>
            <TextField
              margin="normal"
              size="small"
              name="ownerName"
              label="Owner"
              id="owner"
              placeholder="Owner Name"
              InputLabelProps={{
                shrink: true,
              }}
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
            />
          </div>

          <div>
            <TextField
              margin="normal"
              size="small"
              name="ownerEmail"
              label="Email"
              id="email"
              placeholder="Owner Email"
              InputLabelProps={{
                shrink: true,
              }}
              value={ownerEmail}
              onChange={(e) => setOwnerEmail(e.target.value)}
            />
          </div>

          <div>
            <TextField
              id="date"
              margin="normal"
              size="small"
              label="Registration Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

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
        <Grid container direction="row" justify="center">
          <Button
            className={classes.searchButton2}
            variant="contained"
            onClick={searchDatabase}
          >
            Search
          </Button>
        </Grid>
      </div>
    );
  }
}

export default Search;
