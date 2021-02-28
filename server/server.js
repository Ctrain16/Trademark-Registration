const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const userSchema = require("./models/user");
const User = mongoose.model("user", userSchema);
const trademarkSchema = require("./models/trademark");
const Trademark = mongoose.model("trademark", trademarkSchema);

mongoose.connect(
  "mongodb+srv://ctrain:AiRfV9TG7FTDGXhZ@cluster0.m0y2p.mongodb.net/4060-A2?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection.db;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}

app.post("/api/signup", async (req, res) => {
  const { email, name, password } = req.body;
  // TODO: hashing the password
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.send(user);
  } catch (error) {
    console.log("Error", error);
    res.send("Duplicate Email");
  }
});

app.post("/api/login", async (req, res) => {
  const email = req.body.email;

  try {
    const user = await User.findOne({ email });
    res.send(user);
  } catch (error) {
    console.log("Error", error);
  }
});

app.post("/api/register", async (req, res) => {
  const { trademark, owner, email, category } = req.body;

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  const registrationDate = yyyy + "-" + mm + "-" + dd;
  yyyy += 5;
  const expirationDate = yyyy + "-" + mm + "-" + dd;

  try {
    const newTrademark = new Trademark({
      trademark,
      owner,
      email,
      registrationDate,
      expirationDate,
      category,
    });
    await newTrademark.save();
    res.send("Trademark Succesfully Registered");
  } catch (error) {
    console.log("Error", error);
    res.send("Trademark Exists");
  }
});

app.get("/api/trademarks", async (req, res) => {
  const trademarks = await Trademark.find();
  res.send(trademarks);
});

app.post("/api/search", async (req, res) => {
  const { name, email, category, date } = req.body;
  const search = req.body.query;
  console.log(date);

  try {
    const results = await Trademark.find({
      $and: [
        { trademark: { $regex: search } },
        { category: { $regex: category } },
        { owner: { $regex: name } },
        { email: { $regex: email } },
        { registrationDate: { $gte: date } },
      ],
    });
    console.log(results);
    res.send(results);
  } catch (error) {
    console.log("Error", error);
  }
});

app.listen(3001, () => {
  console.log("running on  port 3001");
});
