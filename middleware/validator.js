const { body, validationResult } = require("express-validator");

const validateBook = [
  body("title", "Title is required").notEmpty(),
  body("author", "Author is required").notEmpty(),
  body("pages", "Pages is required").notEmpty(),
  body("rating", "Rating is required").notEmpty(),
  body("genres", "Genre is required").notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateUser = [
  body("first_name", "First Name Field is required").notEmpty(),
  body("last_name", "Last Name Field is required").notEmpty(),
  body("username", "Username Name Field is required").notEmpty(),
  body("email", "Valid email is required").isEmail().withMessage('Email is not valid').notEmpty().withMessage('Email Field is required'),
  body("password", "Password is required").notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
    validateBook,
    validateUser,
  };  