const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  content: String,
  image: String,
  publishedDate: String,
  likeCount: {
    //좋아요 수
    type: Number,
    default: 0,
  },
  likeUser: {
    //좋아요 누른 사람
    type: Array,
    default: [],
  },
  comment: {
    // 댓글 단 사람
    type: Array,
    default: [],
  },
  user: {
    _id: mongoose.Types.ObjectId, //유저의 특수한 아이디를 바탕으로 -> mongoose.Types.ObjectId
    username: String,
  },
});

module.exports = mongoose.model("post", postSchema);
