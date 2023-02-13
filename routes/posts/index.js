const express = require("express");
const router = express.Router();

router.get("/upload", (req, res) => {
  res.render("upload"); //upload 페이지로 이동
});

router.get("/:id", (req, res) => {
  res.render("detail"); //detail 페이지로 이동
});

router.get("/update/:id", (req, res) => {
  res.render("update"); //update 페이지로 이동
});

module.exports = router;
