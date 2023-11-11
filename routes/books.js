var express = require("express");
var router = express.Router();
const { Book } = require("../models");

/* GET books listing. */
router.get("/", async (req, res, next) => {
  const books = await Book.findAll();
  res.render("index", { title: "Books Library", books });
});

router.get("/new", function (req, res, next) {
  // Shows the create new book form
});

router.post("/new", function (req, res, next) {
  // Posts a new book to the database
});

router.get("/:id", function (req, res, next) {
  // Shows book detail form
});

router.post("/:id", function (req, res, next) {
  // Updates book info in the database
});

router.post("/:id/delete", function (req, res, next) {
  // Deletes a book. Be careful, this can’t be undone.
  // It can be helpful to create a new “test” book to test deleting
});

module.exports = router;
