import { Link } from "react-router-dom";

import { Button } from "@material-ui/core";
import Search from "./Search";

function Home({
  loggedIn,
  onClick,
  search,
  setSearch,
  resultsList,
  setResultsList,
  trademarkCategories,
}) {
  return (
    <div className="App">
      <Search
        search={search}
        setSearch={setSearch}
        setResultsList={setResultsList}
        searchType="home"
        trademarkCategories={trademarkCategories}
      />
      {loggedIn ? (
        <Button variant="contained" color="secondary" onClick={onClick}>
          Logout
        </Button>
      ) : (
        <Button
          variant="contained"
          component={Link}
          to="/Login"
          color="primary"
          onClick={onClick}
        >
          Login
        </Button>
      )}
    </div>
  );
}

export default Home;
