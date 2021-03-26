import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "fontsource-roboto";

import Search from "./components/Search";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Trademarks from "./components/Trademarks";
import Header from "./components/Header";
import About from "./components/About";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#29b6f6",
      light: "#53c4f7",
      dark: "#1c7fac",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ffa726",
      light: "#ffb851",
      dark: "#b2741a",
      contrastText: "#000",
    },
  },
});

function App() {
  const trademarkCategories = [
    "Chemicals",
    "Paints",
    "Cleaning Substances",
    "Industrial Oils",
    "Pharmaceuticals",
    "Common Metals",
    "Machines",
    "Hand Tools",
    "Computers and Scientific Devices",
    "Medical Supplies",
    "Appliances",
    "Vehicles",
    "Firearms",
    "Precious Metals",
    "Musical Instruments",
    "Paper Goods",
    "Rubber Products",
    "Leather Goods",
    "Building Materials",
    "Furniture",
    "Household Utensils",
    "Ropes and Textile Products",
    "Yarns and Threads",
    "Textiles",
    "Clothing",
    "Lace and Embroidery",
    "Carpets",
    "Games and Sporting Goods",
    "Meat, Fish, Poultry",
    "Coffee, Flour, Rice",
    "Grains, Agriculture",
    "Beers and Beverages",
    "Alcoholic Beverages",
    "Tobacco Products",
    "Advertising and Business Services",
    "Insurance and Finance Services",
    "Construction and Repair Services",
    "Telecommunications Services",
    "Shipping and Travel Services",
    "Material Treatment Services",
    "Education and Entertainment Services",
    "Science and Technology Services",
    "Food Services",
    "Medical and Vet Services",
    "Legal and Security Services",
  ];

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [resultsList, setResultsList] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [date, setDate] = useState("");

  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <Router>
          <Header loggedIn={loggedIn} onClick={() => setLoggedIn(false)} />
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
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
              )}
            />
            <Route
              path="/Login"
              exact
              render={(props) => (
                <Login
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  setEmail={setEmail}
                />
              )}
            />
            <Route
              path="/Signup"
              exact
              render={(props) => (
                <Signup
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  setEmail={setEmail}
                />
              )}
            />
            <Route
              path="/Register"
              exact
              render={(props) => (
                <Register
                  loggedIn={loggedIn}
                  email={email}
                  setResultsList={setResultsList}
                  trademarkCategories={trademarkCategories}
                />
              )}
            />
            <Route
              path="/Trademarks"
              exact
              render={(props) => (
                <Trademarks
                  resultsList={resultsList}
                  setResultsList={setResultsList}
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
                />
              )}
            />
            <Route path="/About" exact render={(props) => <About />} />
          </Switch>
          <Footer />
        </Router>
      </ThemeProvider>
    </CssBaseline>
  );
}

export default App;
