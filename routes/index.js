var express = require('express');
var router = express.Router();
// const { Book } = require('../models');

// const getbooks = async () => {
//   try {
//     let books = await Book.findAll();
//     console.log(res.json(books));
//   } catch (error) {
//     // Forward error to the global error handler
//     next(error);
//   }
// }

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/books');
});

module.exports = router;
