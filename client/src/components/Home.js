import { Link } from "react-router-dom";
import { useEffect } from "react";

import { Button, Container } from "@material-ui/core";
import Search from "./Search";

function Home({
  loggedIn,
  onClick,
  search,
  setSearch,
  resultsList,
  setResultsList,
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
  useEffect(() => {
    setSearch("");
    setResultsList([]);
    setOwnerName("");
    setOwnerEmail("");
    setCategory("");
    setDate("");
  }, [
    setSearch,
    setResultsList,
    setOwnerName,
    setOwnerEmail,
    setCategory,
    setDate,
  ]);

  return (
    <Container component="main" maxWidth="lg">
      <Search
        search={search}
        setSearch={setSearch}
        setResultsList={setResultsList}
        searchType="home"
        trademarkCategories={trademarkCategories}
        category={category}
        setCategory={setCategory}
        ownerName={ownerName}
        setOwnerName={setOwnerName}
        ownerEmail={ownerEmail}
        setOwnerEmail={setOwnerEmail}
        date={date}
        setDate={setDate}
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
    </Container>
  );
}

export default Home;
