const Post = require("../model/post");

const formatDate = (date) => {
  let d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  let year = d.getFullYear();
  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + month;
  }
  return [year, month, day].join("-");
};

const postCtr = {
  upload: async (req, res) => {
    const { title, content } = req.body; //body값으로 title, content를 불러옴
    const image = req.file.location;
    const publishedDate = formatDate(new Date());
    const post = new Post({
      title: title,
      content: content,
      image: image,
      publishedDate: publishedDate,
      user: req.userInfo,
    });

    try {
      await post.save(); //제대로 저장시 redirect
      res.redirect("/");
    } catch (error) {
      res.status(500).send("upload error!!");
    }
  },

  list: async (req, res) => {
    //메인 페이지에서 보여질 postList
    const posts = await Post.find({}); //전체를 가져옴
    res.render("index", { postListL: posts });
  },
  detail: async (req, res) => {
    //해당 id에 맞는 게시물 조회
    const { id } = req.params;
    const posts = await Post.findById(id); //아이디에 맞는 게시물 가져옴
    res.render("detail", { post: post }); //detail로 넘겨짐
  },

  updateLayout: async (req, res) => {
    //업데이트에 진입했을 때 이전의 데이터들이 미리 가져오는 부분
    const { id } = req.params;
    const post = await Post.findById(id);
    res.render("update", { post: post });
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
      await Post.findByIdAndUpdate(
        id,
        { title: title, content: content },
        { new: true } //업데이트 된 값을 반환
      );
      res.redirect("/"); //성공 시 redirect
    } catch (error) {
      res.status(500).send("update error!!");
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      await Post.findByIdAndDelete(id);
      res.redirect("/");
    } catch (error) {
      res.status(500).send("delete error!!");
    }
  },
};

module.exports = postCtr;
