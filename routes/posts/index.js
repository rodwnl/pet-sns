const express = require("express");
const router = express.Router();
const upload = require("../../module/multer");
const postCtr = require("../../controller/postCtr");

router.get("/upload", (req, res) => {
  res.render("upload"); //upload 페이지로 이동
});

router.get("/:id", postCtr.detail); //detail 페이지로 이동

router.get("/update/:id", (req, res) => {
  res.render("update"); //update 페이지로 이동
});

router.post("/", upload.single("image"), postCtr.upload);

module.exports = router;
