var express = require("express");
var router = express.Router();
const { Book } = require("../models");

const asyncHandler = (cb) => {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      res.status(500).send(err);
    }
  };
};

/* GET books listing. */
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const books = await Book.findAll();
    res.render("index", { title: "Books Library", books });
  })
);

// Shows the create new book form
router.get("/new", function (req, res, next) {
  res.render("new-book", { title: "New Book" });
});

// Posts a new book to the database
router.post(
  "/new",
  asyncHandler(async (req, res, next) => {
    await Book.create(req.body);
    res.redirect("/books");
  })
);

// Shows book detail form
router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const book = await Book.findByPk(req.params.id);
    res.render("update-book", { title: book.title, book })
  })
);

// Updates book info in the database
router.post(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const book = await Book.findByPk(req.params.id);
    await book.update(req.body);
    res.redirect('/books');
  })
);

// Deletes a book.
// router.post(
//   "/:id/delete",
//   asyncHandler(async (req, res, next) => {
//     // Be careful, this can’t be undone.
//     // It can be helpful to create a new “test” book to test deleting
//   })
// );

module.exports = router;
