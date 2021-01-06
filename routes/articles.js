const express = require("express");
const db = require("../config/database");
const Article = require("../models/Article");
const router = express.Router();
const { Sequelize, Op } = require("sequelize");

// Get articles
router.get("/", (req, res) => {
  Article.findAll()
    .then((articles) => {
      res.render("articles", {
        articles,
      });
    })
    .catch((err) => console.log(err));
});

// Display article form
router.get("/add", (req, res) => {
  res.render("add");
});

// Add an article
router.post("/add", (req, res) => {
  let { title, content, author } = req.body;
  let errors = [];

  // Validation
  if (!title) {
    errors.push({ text: "Please add a title !" });
  }
  if (!content) {
    errors.push({ text: "Please add a content !" });
  }
  if (!author) {
    errors.push({ text: "Please add an author !" });
  }

  // Checking errors
  if (errors.length > 0) {
    res.render("add", {
      errors,
      title,
      content,
      author,
    });
  } else {
    // Insert into table
    Article.create({
      title,
      content,
      author,
    })
      .then((article) => res.redirect("/articles"))
      .catch((err) => console.log(err));
  }
});

// Search an article
router.get("/search", (req, res) => {
  let { term } = req.query;

  term = term.toLowerCase();

  Article.findAll({
    where: {
      title: {
        [Op.like]: "%" + term + "%",
      },
    },
  })
    .then((articles) => {
      res.render("articles", { articles });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
