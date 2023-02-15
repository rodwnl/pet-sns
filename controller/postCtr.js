const Post = require("../model/post");

const postCtr = {
  upload: async (req, res) => {
    const { title, content } = req.body; //body값으로 title, content를 불러옴
    const image = req.file;
  },
};

module.exports = postCtr;
