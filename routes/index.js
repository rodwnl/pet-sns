var express = require("express");
var router = express.Router();
const authRouter = require("./auth"); //require로 라우터 받아옴
const postRouter = require("./posts");

router.get("/", (req, res) => {
  res.render("index", { postList: [] }); //게시물에 관한 값이 postList에 닮김, index.ejs에 보여줌
});

router.use("/auth", authRouter); // auth 경로를 받았을 시 get, post, 등등 어떤 명령어든 authRotuer로 보내겠다
router.use("/posts", postRouter);

module.exports = router;
