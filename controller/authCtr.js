const User = require("../model/auth");
const bcrypt = require("bcrypt");
const secretKey = require("../config/secretKey.json");
const jwt = require("jsonwebtoken");

const authCtr = {
  register: async (req, res) => {
    const { username, password } = req.body;

    const exist = await User.findOne({ username: username }); //username과 일치하는 항목이 있는지
    if (exist) {
      res.status(504).send("user exist!!");
      return;
    }

    const user = new User({
      //username이 없다면 회원가입 진행하게끔
      username: username,
    });

    const hashedPassword = await bcrypt.hash(password, 10); //보안을 위해 brycpt를 사용, 해쉬 알고리즘을 10번 돌리겠다.
    user.password = hashedPassword;
    await user.save();
    res.redirect("/");
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username }); //username 받아오기
    if (!user) {
      //user가 없다면
      res.status(500).send("user not found!!");
      return;
    }

    const valid = await bcrypt.compare(password, user.password); //user를 찾았으면 password를 비교. 입력받은 password랑 db에 저장한 password랑 비교
    if (!valid) {
      res.status(500).send("password invalid");
    }

    const data = user.toJSON();
    delete data.password; //password 정보는 필요없기 때문에 빼놓음
    const token = jwt.sign(
      //토큰 생성
      {
        _id: data._id,
        username: data.username,
      },
      secretKey.key, //복호화는 중요하기 때문에 secretKey.json을 따로 빼놓음
      {
        expiresIn: "7d", //토큰을 얼마나 지속할 것인지
      }
    );
    res.cookie("access_token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, //일주일 유지
      httpOnly: true, //http에서만 접근
    });
    res.redirect("/");
  },
};

module.exports = authCtr;
