const router = express.Router();
const path = require("path");
const User = require("../models/user");
const { validateUser } = require("../middleware/validator");


router
  .route("/sign-up")
  .get((req, res) => {
    res.sendFile(path.join(__dirname, "../views", "sign-up.html"));
  })
  .post(validateUser, (req, res) => {
    const { first_name, last_name, username, email, password } = req.body;
    const newUser = new User({first_name, last_name, username, email, password,
    });

    newUser
      .save()
      .then(() => {
        res.status(201).json({ message: "Successfully Added" });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  });
  router
  .route("/login")
  .get((req, res) => {
    res.sendFile(path.join(__dirname, "../views", "login.html"));
  })
  .post((req, res) => {
    const { email, password } = req.body;
    
    User.findOne({ email })
      .then(user => {
        if (!user) {
          console.log(`User with email ${email} not found`);
          return res.status(400).json({ error: `User with email ${email} not found` });
        }
        // Compare passwords
        if (user.password !== password) {
          console.log(`Incorrect password for user ${email}`);
          return res.status(400).json({ error: `Incorrect password for user ${email}` });
        }
        // Passwords match, login successful
        console.log(`Hello ${user.first_name}, with username ${user.username} (${email}) logged in successfully`);
        res.json({ message: `Hello ${user.first_name}, with username ${user.username} (${email}) logged in successfully` });
      })
      .catch(error => {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  });
module.exports = router;
