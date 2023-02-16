const express = require("express");
const router = express.Router();
const upload = require("../../module/multer");
const postCtr = require("../../controller/postCtr");

router.get("/upload", (req, res) => {
  res.render("upload"); //upload 페이지로 이동
});

router.get("/:id", postCtr.detail); //detail 페이지로 이동

router.get("/update/:id", postCtr.updateLayout); //업데이트시 해당 업데이트 레이아웃으로

router.post("/", upload.single("image"), postCtr.upload);

router.post("/update/:id", postCtr.update); //update인데 post로 하는 이유 -> form 사용시 전해줄 수 있는 형태가 GET과 POST 뿐이라서

router.post("/delete/:id", postCtr.delete);

module.exports = router;
