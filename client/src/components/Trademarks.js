import { Container, Typography, Grid } from "@material-ui/core";
import { useEffect } from "react";

import axios from "axios";

import Search from "./Search";

function Trademarks({
  resultsList,
  setResultsList,
  search,
  setSearch,
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
    if (
      resultsList.length === 0 &&
      !search &&
      !ownerName &&
      !ownerEmail &&
      !category &&
      !date
    ) {
      axios.get("http://localhost:3001/api/trademarks").then((response) => {
        setResultsList(response.data);
      });
    }
  }, [
    category,
    date,
    ownerEmail,
    ownerName,
    resultsList.length,
    search,
    setCategory,
    setDate,
    setOwnerEmail,
    setOwnerName,
    setResultsList,
  ]);

  return (
    <Container component="main" maxWidth="lg">
      <Typography
        variant="h4"
        style={{
          marginTop: 20,
        }}
      >
        Trademarks
      </Typography>
      <Search
        setResultsList={setResultsList}
        searchType="results"
        search={search}
        setSearch={setSearch}
        trademarkCategories={trademarkCategories}
        category={category}
        setCategory={setCategory}
        ownerName={ownerName}
        setOwnerName={setOwnerName}
        ownerEmail={ownerEmail}
        setOwnerEmail={setOwnerEmail}
        date={date}
        setDate={setDate}
      />{" "}
      <Grid container direction="row" justify="center">
        <table>
          <tbody>
            <tr>
              <th>Trademark</th>
              <th>Owner Name</th>
              <th>Owner Email</th>
              <th>Registration Date</th>
              <th>Expiration Date</th>
              <th>Category</th>
            </tr>

            {resultsList.map((trademark, index) => {
              return (
                <tr key={index}>
                  <td>{trademark.trademark}</td>
                  <td>{trademark.owner}</td>
                  <td>{trademark.email}</td>
                  <td>{trademark.registrationDate.split("T")[0]}</td>
                  <td>{trademark.expirationDate.split("T")[0]}</td>
                  <td>{trademark.category}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Grid>
    </Container>
  );
}

export default Trademarks;
