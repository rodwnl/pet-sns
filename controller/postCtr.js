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
};

module.exports = postCtr;
