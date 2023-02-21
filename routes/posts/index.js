const express = require("express");
const router = express.Router();
const upload = require("../../module/multer");
const postCtr = require("../../controller/postCtr");
const checkUser = require("../../module/checkUser"); //다른 라우터에 middleware 적용

router.get("/upload", checkUser, (req, res) => {
  res.render("upload"); //upload 페이지로 이동
});

router.get("/:id", postCtr.detail); //detail 페이지로 이동

router.get("/update/:id", checkUser, postCtr.updateLayout); //업데이트시 해당 업데이트 레이아웃으로

router.post("/", checkUser, upload.single("image"), postCtr.upload);

router.post("/update/:id", checkUser, postCtr.update); //update인데 post로 하는 이유 -> form 사용시 전해줄 수 있는 형태가 GET과 POST 뿐이라서

router.post("/delete/:id", checkUser, postCtr.delete);

router.post("/like/:id", checkUser, postCtr.like);

router.post("/comment/:id", checkUser, postCtr.comment);

module.exports = router;
