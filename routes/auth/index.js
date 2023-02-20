const express = require("express");
const router = express.Router();
const authCtr = require("../../controller/authCtr");

router.post("/register", authCtr.register);
router.post("/login", authCtr.login);

router.get("/login", (req, res) => {
  res.render("login"); //login url로 접근했을 때 login을 보여줌
});

router.get("/register", (req, res) => {
  res.render("register");
});

module.exports = router;
