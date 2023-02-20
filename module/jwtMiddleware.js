const jwt = require("jsonwebtoken");
const secretKey = require("../config/secretKey.json");

const jwtMiddleware = async (req, res, next) => {
  const token = req.cookies.access_token; //토큰 받아오기
  if (!token) {
    res.locals.isAuthenticated = {}; //토큰이 없다면 객체형태로 초기화
    return next();
  }

  try {
    const decoded = jwt.verify(token, secretKey.key); //시크릿 키를 바탕으로 token 값을 해독
    req.userInfo = {
      //decoded가 잘있다면 request로 정보를 받아옴
      _id: decoded._id,
      username: decoded.username,
    };
    res.locals.isAuthenticated = { username: decoded.username };
    return next();
  } catch (error) {
    res.status(500).send("jwt error!");
  }
};

module.exports = jwtMiddleware;
