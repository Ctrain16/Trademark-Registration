import { useHistory } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
import { Button, InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

function Search({
  search,
  setSearch,
  setResultsList,
  searchType,
  trademarkCategories,
}) {
  const history = useHistory();

  const [category, setCategory] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [date, setDate] = useState("");

  function onSubmit(e) {
    e.preventDefault(); //doesn't submit to page

    Axios.post("http://localhost:3001/api/search", {
      query: search,
      name: ownerName,
      email: ownerEmail,
      date: date,
      category: category,
    }).then((response) => {
      setResultsList(response.data);
      history.push("/ViewTrademarks");
    });
  }

  return (
    <div className="results-container">
      <div className={searchType === "home" ? "search" : "results-search"}>
        <h1>CTRC</h1>
        {searchType === "home" && <h3> Cal's Trademark Registration Center</h3>}

        <form>
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
            <Button variant="outlined">Search</Button>
          </div>
        </form>
      </div>

      {searchType === "results" && (
        <div className="advanced-search">
          <form onSubmit={onSubmit}>
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
