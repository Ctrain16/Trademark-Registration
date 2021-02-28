import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Button, InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

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

  return (
    <div>
      <div className={searchType === "home" ? "search" : "results-search"}>
        <h1>CTRC</h1>
        {searchType === "home" && <h3> Cal's Trademark Registration Center</h3>}

        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <TextField
              type="text"
              name="search"
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
          </div>
          <div>
            <Button variant="outlined" onClick={searchDatabase}>
              Search
            </Button>
          </div>
        </form>
      </div>

      {searchType === "results" && (
        <div className="advanced-search">
          <form onSubmit={(e) => e.preventDefault()}>
            <select
              name="category"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="" disabled>
                Select trademark category
              </option>
              {trademarkCategories.map((catType, index) => (
                <option key={index} value={catType}>
                  {catType}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="ownerName"
              placeholder="Owner Name"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
            />
            <input
              type="text"
              name="ownerEmail"
              placeholder="Owner Email"
              value={ownerEmail}
              onChange={(e) => setOwnerEmail(e.target.value)}
            />
            <input
              type="date"
              name="startDate"
              value={date}
              onChange={(e) => setDate(e.target.value)}
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
        </div>
      )}
    </div>
  );
}

export default Search;
