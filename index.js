require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

var exphbs = require("express-handlebars");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

//  Import database.js
const db = require("./config/database");

// Test database
db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// Express Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("index", { layout: "landing" });
});

// Articles route
const articles = require("./routes/articles");
app.use("/articles", articles);

app.listen(process.env.PORT, (err) => {
  if (err) {
    throw new Error("Something bad happened...");
  }
  console.log(`Server is listening on ${process.env.PORT}`);
});

module.exports = app;
