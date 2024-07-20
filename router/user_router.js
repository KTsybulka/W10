const express = require("express");
const router = express.Router();
const path = require("path");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const {
  validateUserSignup,
  validateUserLogin,
} = require("../middleware/validator");

// Serve static files
router.get("/user/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "books.html"));
});

router.get("/user-list", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "books.html"));
});

// User signup
router
  .route("/sign-up")
  .get((req, res) => {
    res.sendFile(path.join(__dirname, "../views", "sign-up.html"));
  })
  .post(validateUserSignup, (req, res) => {
    const { first_name, last_name, username, email } = req.body;

    bcrypt
      .hash(req.body.password, 10)
      .then((hashedPassword) => {
        const newUser = new User({
          first_name,
          last_name,
          username,
          email,
          password: hashedPassword,
        });

        return newUser.save();
      })
      .then(() => {
        res.status(201).json({ message: "Successfully Added" });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  });

// User login
router
  .route("/login")
  .get(validateUserLogin, (req, res) => {
    res.sendFile(path.join(__dirname, "../views", "login.html"));
  })
  .post((req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
      .then((user) => {
        if (!user) {
          console.log(`User with email ${email} not found`);
          return res
            .status(400)
            .json({ error: `User with email ${email} not found` });
        }

        return bcrypt.compare(password, user.password).then((isMatched) => {
          if (!isMatched) {
            return res
              .status(400)
              .json({ error: `Incorrect password for user ${email}` });
          }

          console.log(
            `Hello ${user.first_name}, with username ${user.username} (${email}) logged in successfully`
          );
          res.json({
            message: `Hello ${user.first_name}, with username ${user.username} (${email}) logged in successfully`,
          });
        });
      })
      .catch((error) => {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  });

module.exports = router;
