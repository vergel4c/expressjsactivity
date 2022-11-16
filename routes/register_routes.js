const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index")

})

router.get("/register", function (req, res) {
    res.render("register");
  });
  

module.exports = router;