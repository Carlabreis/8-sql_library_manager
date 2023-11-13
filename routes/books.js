var express = require("express");
var router = express.Router();
const { Op } = require("sequelize");
const { Book } = require("../models");

// pre determine number of books per page
const itemsPerPage = 10;


const asyncHandler = (cb) => {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      // res.status(500).send(error);
      console.log(error);
      next(error);
    }
  };
};

// GET books listing.
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    let search = req.query.search || "";
    let pageNumber = req.query.page || 1;

    // find all books or by search query
    let books = await Book.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${search}%` } },
          { author: { [Op.like]: `%${search}%` } },
          { genre: { [Op.like]: `%${search}%` } },
          { year: { [Op.like]: `%${search}%` } },
        ],
      },
    });

    // pagination
    let numberOfPages = Math.ceil(books.length / itemsPerPage);
    req.query.page
      ? (books = books.slice(
          req.query.page * itemsPerPage - itemsPerPage,
          req.query.page * itemsPerPage
        ))
      : (books = books.slice(0, itemsPerPage));

    // render results
    res.render("index", {
      title: "Books Library",
      books,
      numberOfPages,
      pageNumber,
      search,
    });
  })
);

// GET create new book form
router.get("/new", function (req, res, next) {
  res.render("new-book", { title: "New Book" });
});

// POST a new book to the database
router.post(
  "/new",
  asyncHandler(async (req, res, next) => {
    let book;
    try {
      book = await Book.create(req.body);
      res.redirect("/books");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        // checking the error
        book = await Book.build(req.body);
        res.render("new-book", {
          book,
          errors: error.errors,
          title: "New Book",
        });
      } else {
        throw error; // error caught in the asyncHandler's catch block
      }
    }
  })
);

// GET book detail form
router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      res.render("update-book", { title: book.title, book });
    } else {
      const err = new Error();
      err.status = 404;
      throw err;
    }
  })
);

// POST update to book info in the database
router.post(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const book = await Book.findByPk(req.params.id);
    try {
      await book.update(req.body);
      res.redirect("/books");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        // checking the error
        res.render("update-book", {
          book,
          errors: error.errors,
          title: "Update Book",
        });
      } else {
        throw error; // error caught in the asyncHandler's catch block
      }
    }

  })
);

// POST delete a book
router.post(
  "/:id/delete",
  asyncHandler(async (req, res, next) => {
    const book = await Book.findByPk(req.params.id);
    await book.destroy();
    res.redirect("/books");
  })
);

module.exports = router;
