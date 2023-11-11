var express = require('express');
var router = express.Router();
const { Book } = require('../models');


/* GET home page. */
router.get('/', async(req, res, next) => {
  try {
    const books = await Book.findAll();
    return res.json(books);
  } catch (error) {
    // Forward error to the global error handler
    next(error);
  } 
});

module.exports = router;
