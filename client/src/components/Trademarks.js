import { useEffect, useState } from "react";

import Axios from "axios";

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
      Axios.get("http://localhost:3001/api/trademarks").then((response) => {
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
    <div>
      <div>
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
      </div>

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
    </div>
  );
}

export default Trademarks;
