import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import Register from "./components/Register";

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

  return (
    <div>
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <Home
                loggedIn={loggedIn}
                onClick={() => setLoggedIn(false)}
                search={search}
                setSearch={setSearch}
                resultsList={resultsList}
                setResultsList={setResultsList}
                trademarkCategories={trademarkCategories}
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
          <Route path="/Signup" component={Signup} exact />
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
          <Route path="/Results" exact />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
